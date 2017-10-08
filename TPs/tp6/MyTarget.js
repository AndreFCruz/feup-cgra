/**
 * MyTarget
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTarget(scene, positionX, positionY, positionZ) {
    CGFobject.call(this, scene);
    
    //Vector containting the position Coordinates
    this.position = [
        positionX,
        positionY,
        positionZ
    ];

    //Shapes
    this.hemisphere = new MySemiSphere(this.scene, 12, 6);

    //MACROS
    this.TARGET_SIZE = 0.6;
    this.ANG_VELOCITY = 1;

    //Animation
    this.rotation_ang = 0;
    this.lastUpdateTime = 0;

    this.destroyed = false;

    //Target Materials
    this.targetAppearance = new CGFappearance(this.scene);
    this.targetAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.targetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.targetAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.targetAppearance.setShininess(30);
    this.targetAppearance.loadTexture("../resources/images/target.png");
}
;

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

    this.targetAppearance.apply();

    this.scene.pushMatrix();
        
        //Poisitioning the object in the desired position
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.rotation_ang, 0, 1, 0);
        this.scene.scale(this.TARGET_SIZE, this.TARGET_SIZE, this.TARGET_SIZE);

        this.scene.pushMatrix();
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.hemisphere.display();
        this.scene.popMatrix();  

        this.hemisphere.display(); 

    this.scene.popMatrix();
};

MyTarget.prototype.update = function(currTime) {
    var deltaTime = currTime - this.lastUpdateTime;
    this.lastUpdateTime = currTime;

    this.rotation_ang += 0.001 * deltaTime * this.ANG_VELOCITY;  
};

MyTarget.prototype.setDestroyed = function () {
    this.destroyed = true;  
};

MyTarget.prototype.getStatus = function () {
    return this.destroyed;  
};