/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, sub_pos, sub_ang, target) {
    CGFobject.call(this, scene);
    
    //Array containting the Position Coordinates
    this.position = [
        sub_pos[0],
        sub_pos[1],
        sub_pos[2],
    ];

    //Array containting the Initial Position
    this.init_pos = [
        sub_pos[0],
        sub_pos[1],
        sub_pos[2],
    ];

    //Polar angle θ (theta)
    this.theta_ang = 0;
    
    //Azimuthal angle φ (phi)
    this.phi_ang = sub_ang * this.scene.deg2rad;

    //Array representing the Orientation Vector
    this.orientation = [];

    //Torpedo's Target
    this.target = target;

    //Getting the distance in a straight line, to the target
    this.targetDistance = Math.sqrt(Math.pow(this.position[0] - this.target.position[0], 2) + 
                                    Math.pow(this.position[1] - this.target.position[1], 2) + 
                                    Math.pow(this.position[2] - this.target.position[2], 2));

    //Shapes
    this.hemisphere = new MySemiSphere(this.scene, 12, 6);
    this.cylinder = new MyCylinder(this.scene, 12, 6);
    this.tailTrapeze = new MyTrapeze(this.scene, 1, 0.65);

    //Torpedo Macro's for function display
    this.RADIUS = 0.1;
    this.BODY_LENGTH = 0.75;
    this.TRAPEZE_LENGTH = 0.5;
    this.TRAPEZE_HEIGHT = 0.03;
    this.TRAPEZE_THICKNESS = 0.08;
    this.TORPEDO_LENGTH = 1;

    //Torpedo's Animation
    this.animationStatus = {
        PREPARING: 0,
        MOVEMENT:  1,
        EXPLOSION: 2,
        INVISIBLE: 3,
        DESTROYED: -1,
    }
    this.animationCurrentStatus = this.animationStatus.PREPARING;
    this.visible = true;

    this.PREPARING_LENGTH = 0.8;
    this.EXPLOSION_MAX_RADIUS = 1;
    this.EXPLOSION_VELOCITY = 3;

    //Current explosion
    this.explosion = null;

    //Torpedo's Update
    this.t = 0; //Parameter for Bezier function
    this.velocity = 1;
    this.delta_t = 2 / this.targetDistance; // (1/2) second per world unit

    //Modulation the Bezier Curve
    this.P2_DELTA = 6;
    var p1 = [this.position[0], this.position[1] - this.PREPARING_LENGTH, this.position[2]];
    var p2 = [this.position[0] + this.P2_DELTA * Math.sin(this.phi_ang), this.position[1] - this.PREPARING_LENGTH, this.position[2] + this.P2_DELTA * Math.cos(this.phi_ang)];
    var p3 = [this.target.position[0], this.target.position[1] + 3 + this.TORPEDO_LENGTH / 4, this.target.position[2]];
    var p4 = [this.target.position[0], this.target.position[1] + this.TORPEDO_LENGTH / 4, this.target.position[2]];

    this.bezier = new MyBezier(p1, p2, p3, p4);

    this.start_time = null;
    this.end_time = null;

    //Torpedo Materials
    this.torpedoAppearance = new CGFappearance(this.scene);;
    this.torpedoAppearance.setShininess(30);
    this.torpedoAppearance.loadTexture("../resources/images/torpedo.png");

    // Sounds
    var sound = new Audio('../resources/sounds/torpedo_launch.mp3');
    sound.volume = 0.3;
    sound.play();
    
}
;

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {
    
    //Explosion
    if (this.explosion != null)
        this.explosion.display();

    if (!this.visible)
        return;

    this.torpedoAppearance.apply();

    this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        
        this.scene.rotate(this.phi_ang, 0, 1, 0);
        this.scene.rotate(this.theta_ang, 1, 0, 0);
        

        //Main Body
        this.scene.pushMatrix();
            this.scene.scale(this.RADIUS, this.RADIUS, this.BODY_LENGTH);
            this.cylinder.display();
        this.scene.popMatrix();

        //Torpedo Nose
        this.scene.pushMatrix();
            this.scene.scale(this.RADIUS, this.RADIUS, (1 - this.BODY_LENGTH) / 2);
            this.scene.rotate(180 * this.scene.deg2rad, 0, 1, 0);
            this.hemisphere.display();
        this.scene.popMatrix();

        //Torpezo Tail
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.BODY_LENGTH);
            this.scene.scale(this.RADIUS, this.RADIUS, (1 - this.BODY_LENGTH) / 2);
            this.hemisphere.display();
        this.scene.popMatrix();

        //Vertical Tail trapeze
        this.scene.pushMatrix();
            this.scene.rotate(90 * this.scene.deg2rad, 0, 0, 1);
            this.scene.translate(0, 0, this.TRAPEZE_THICKNESS);
            this.scene.scale(this.TRAPEZE_LENGTH, this.TRAPEZE_HEIGHT, this.TRAPEZE_THICKNESS);
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.tailTrapeze.display();
        this.scene.popMatrix();

        //Horizontal Tail trapeze
        this.scene.pushMatrix();
            this.scene.translate(0, 0, this.TRAPEZE_THICKNESS);
            this.scene.scale(this.TRAPEZE_LENGTH, this.TRAPEZE_HEIGHT, this.TRAPEZE_THICKNESS);
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.tailTrapeze.display();
        this.scene.popMatrix();

    this.scene.popMatrix();
};

MyTorpedo.prototype.update = function(deltaTime) {
    
    switch(this.animationCurrentStatus) {

        case this.animationStatus.PREPARING:
            this.position[1] -= (deltaTime * 0.001) * this.velocity;
            this.updateStatus();
            break;

        case this.animationStatus.MOVEMENT:
            this.t += (deltaTime * 0.001) * this.delta_t;
            this.position = this.bezier.calcPosition(this.t);
            this.updateStatus();
            break;

        case this.animationStatus.EXPLOSION:
            if (this.explosion == null)
                this.explosion = new MyExplosion(this.scene, this.position, this.EXPLOSION_VELOCITY, this.EXPLOSION_MAX_RADIUS);
            this.explosion.update(deltaTime);
            this.updateStatus();
            break;
        
        case this.animationStatus.INVISIBLE:
            this.explosion.update(deltaTime);
            this.updateStatus();
            break;

        case this.animationStatus.DESTROYED:
            this.explosion = null;
    }
};


MyTorpedo.prototype.updateStatus = function() {
    
    switch (this.animationCurrentStatus) {
       
        case this.animationStatus.PREPARING:
            if (this.init_pos[1] - this.PREPARING_LENGTH >= this.position[1]) {
                this.animationCurrentStatus = this.animationStatus.MOVEMENT;
                this.start_time = Date.now();
            }
            break;
            
        case (this.animationStatus.MOVEMENT):
            this.setOrientation();
            if (this.t >= 1) {
                this.animationCurrentStatus = this.animationStatus.EXPLOSION;
                this.end_time = Date.now();
                console.log("Distance: " + this.targetDistance);
                console.log(this.end_time - this.start_time);
            }
            break;

        case(this.animationStatus.EXPLOSION):
            if (this.explosion.isBig()) {
                this.visible = false;
                this.target.setDestroyed();
                this.animationCurrentStatus = this.animationStatus.INVISIBLE;
            }

        case (this.animationStatus.INVISIBLE):
            if (this.explosion.isOver()) {
                this.animationCurrentStatus = this.animationStatus.DESTROYED;               
            }
            break;
    }
};


MyTorpedo.prototype.setOrientation = function() { 
    
    this.orientation = this.bezier.calcDerivative(this.t);

    // Convert Cartesian coordinates to Spherical Coordinates
    var r = Math.sqrt( Math.pow(this.orientation[0], 2) + Math.pow(this.orientation[1], 2) + Math.pow(this.orientation[2], 2) );

    this.theta_ang = Math.acos(this.orientation[1] / r) - Math.PI / 2;
    this.phi_ang = Math.atan(this.orientation[0] / this.orientation[2]) + (this.orientation[2] < 0 ? Math.PI : 0);
    
};

MyTorpedo.prototype.wasDestroyed = function() {
    
    if (this.animationCurrentStatus == this.animationStatus.DESTROYED) {
        return true;
    }
    else
        return false;
};
