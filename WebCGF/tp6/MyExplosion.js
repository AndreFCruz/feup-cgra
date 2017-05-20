/**
 * MyExplosion
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyExplosion(scene, pos, velocity) {
    CGFobject.call(this, scene);
    
    //Array containting the Position Coordinates
    this.position = [
        pos[0],
        pos[1],
        pos[2],
    ];

    this.velocity = velocity;

    //Shapes
    this.hemisphere = new MySemiSphere(this.scene, 12, 6);

    //Radius of the current explosion
    this.explosionRadius = 0;
    //this.explosion = new MyExplosion(this.scene, position);

    //MACRO's for Design
    this.MAIN_SIZE = 1;
    this.MEDIUM_SIZE = 0.7;
    this.SMALL_SIZE = 0.4;

    //Explosion's Update
    //TODO

    //Explosion Texture
    this.explosionAppearance = new CGFappearance(this.scene);
    this.explosionAppearance.setAmbient(1, 1, 1, 1);
    this.explosionAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.explosionAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.explosionAppearance.setShininess(70);
    this.explosionAppearance.loadTexture("../resources/images/explosion.png");
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {

    this.explosionAppearance.apply();
    
    this.scene.pushMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(this.explosionRadius, this.explosionRadius, this.explosionRadius);

        //Main Explosion Body
        this.scene.pushMatrix();
            this.scene.scale(this.MAIN_SIZE, this.MAIN_SIZE, this.MAIN_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();

        //Side Bodies
        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(this.MEDIUM_SIZE *  3 / 4, this.MEDIUM_SIZE * 3 / 4, 0);
            this.sphereDisplay(); 
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(-this.MEDIUM_SIZE / 3, -this.MAIN_SIZE/2, -this.MAIN_SIZE / 2);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(0, -this.MAIN_SIZE * 3 / 4, 0);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(0, this.MAIN_SIZE / 3, this.MAIN_SIZE * 3 / 4);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(-this.MAIN_SIZE / 2, this.MAIN_SIZE / 3, -this.MAIN_SIZE/ 4);
            this.sphereDisplay();
        this.scene.popMatrix();

    this.scene.popMatrix();
};

MyExplosion.prototype.update = function(deltaTime) {
    this.explosionRadius += deltaTime * 0.001 * this.velocity;
};

MyExplosion.prototype.getRadius = function() {
    return this.explosionRadius;
};

MyExplosion.prototype.sphereDisplay = function () {
    this.scene.pushMatrix();
        this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
        this.hemisphere.display();
    this.scene.popMatrix();  

    this.scene.pushMatrix();
        this.scene.rotate(180 * this.scene.deg2rad, 0, 0, 1);
        this.hemisphere.display();
    this.scene.popMatrix(); 
}