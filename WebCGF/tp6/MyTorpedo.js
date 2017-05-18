/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene, sub_pos, sub_ang) {
    CGFobject.call(this, scene);
    
    //Array containting the Initial position Coordinates
    this.position = [
        sub_pos[0],
        sub_pos[1],
        sub_pos[2],
    ];

    this.init_ang = sub_ang * this.scene.deg2rad;

    //Array representing the Orientation Vector
    this.orientation = [
        this.orientationX,
        this.orientationY,
        this.orientationZ,
    ];

    //Torpedo's Target
    this.target = this.scene.targets[this.scene.currentTarget++];

    //Getting the distance in a straight line, to the target
    this.targetDistance = Math.sqrt(Math.pow(this.position[0] - this.target.position[0], 2) + 
                                    Math.pow(this.position[1] - this.target.position[1], 2) + 
                                    Math.pow(this.position[2] - this.target.position[2], 2));

    //Modulation the Bezier Curve
    var p2 = [this.position[0] + 6 * Math.sin(this.init_ang), 0, this.position[2] + 6 * Math.cos(this.init_ang)];
    var p3 = [this.target.position[0], this.target.position[1], this.target.position[2] + 3];
    this.bezier = new MyBezier(this.position, p2, p3, this.target.position);

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

    //Torpedo's Animation
    this.velocity = 1;

    //
    this.t = 0;
    this.delta_t = this.targetDistance / this.velocity;

    //Torpedo Materials
    //TODO
}
;

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

    this.scene.pushMatrix();

    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.init_ang, 0, 1, 0);

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
    
    if (this.t <= 1) {
        this.t = this.t + (deltaTime * 0.001) / this.delta_t;
        this.position = this.bezier.calcPosition(this.t);
    }

};

/*MyTorpedo.prototype.setTarget = function(target) {
    this.target = target;

    this.orientation[0] = this.position[0] - this.target.position[0];
    this.orientation[1] = this.position[1] - this.target.position[1];
    this.orientation[2] = this.position[2] - this.target.position[2];

    //Generatint the new Curve
    var point2 = [this.position[0] + 6 * Math. , this.position[1]]
    this.bezier = new MyBezier(this.position, th, , this.target.position)
};

//Function to get the distance between the torpedo and its target
MyTorpedo.prototype.getTargetDistance = function() {
    if (this.target == null)
        return 0;   
        
    return Math.sqrt(Math.pow(this.position[0] - this.target.position[0], 2) + 
                     Math.pow(this.position[1] - this.target.position[1], 2) + 
                     Math.pow(this.position[2] - this.target.position[2], 2));
};*/