/**
 * MyTorpedo
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTorpedo(scene) {
    CGFobject.call(this, scene);
    
    //Array containting the position Coordinates
    this.position = [
        this.positionX,
        this.positionY,
        this.positionZ,
    ];

    //Array representing the Orientation Vector
    this.orientation = [
        this.orientationX,
        this.orientationY,
        this.orientationZ,
    ];

    //Torpedo's Target
    this.target = null;

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

    //Torpedo Materials
    //TODO
}
;

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

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
};