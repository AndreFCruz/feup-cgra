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

    //Modulation the Bezier Curve
    var p2 = [this.position[0] + 6 * Math.sin(this.phi_ang), 0, this.position[2] + 6 * Math.cos(this.phi_ang)];
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
    
    this.t = 0; //Parameter for Bezier function
    
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
        this.scene.rotate(this.phi_ang, 0, 1, 0);
        this.scene.rotate(this.theta_ang, 0, 0, 1);
        console.log("GOD PLZ " + this.theta_ang);

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
    
    var old_position = this.position;

    if (this.t <= 1) {
        this.t = this.t + (deltaTime * 0.001) / this.delta_t;
        this.position = this.bezier.calcPosition(this.t);
    }
    
    this.orientation = [this.position[0] - old_position[0],
                      this.position[1] - old_position[1],
                      this.position[2] - old_position[2]]

    //Working with Spherical Coordinates
    var ro = Math.sqrt(Math.pow(this.orientation[0], 2) + Math.pow(this.orientation[1], 2) + Math.pow(this.orientation[2], 2));
    var projection = Math.sqrt(Math.pow(this.orientation[0], 2) + Math.pow(this.orientation[2], 2));
    
    //this.theta_ang = (Math.PI / 2) - Math.acos(this.orientation[1] / ro);
    //this.theta_ang = Math.asin(this.orientation[1] / ro);
    //this.phi_ang = Math.acos(this.orientation[2] / projection);
    //this.phi_ang = Math.asin(this.orientation[2] / projection);
    
    //this.phi_ang = Math.atan(this.orientation[1] / Math.sqrt(Math.pow(this.orientation[0], 2) + Math.pow(this.orientation[2], 2)));
    //this.theta_ang = Math.atan()


};