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
    this.hemisphere = MySemiSphere(this.scene, 12, 6);
    this.cube = MyUnitCubeQuad(this.scene);

    //If shape is true, uses sphere, instead uses cube
    if (Math.random() >= 0.5)
        this.shape = true;
    else
        this.shape = false;

    //Target Materials
    this.targetAppearance = new CGFappearance(this.scene);
    this.targetAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.targetAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.targetAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.targetAppearance.setShininess(50);
    this.targetAppearance.loadTexture("../resources/images/target.png");
}
;

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

    this.targetAppearance.apply();

    this.scene.pushMatrix();
        
        //Poisitioning object in the desired position
        this.scene.translate(position[0], position[1], position[3]);

        if (shape) {
            this.scene.pushMatrix();
                this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
                this.hemisphere.display();
            this.scene.popMatrix();  

            this.hemisphere.display(); 

        } else
            this.cube.display();

    this.scene.popMatrix();
};