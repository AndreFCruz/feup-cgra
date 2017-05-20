/**
 * MyExplosion
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyExplosion(scene, pos, velocity, maxRadius) {
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
    this.explosionMaxRadius = maxRadius;

    //MACRO's for Design
    this.MAIN_SIZE = 1;
    this.MEDIUM_SIZE = 0.7;
    this.SMALL_SIZE = 0.4;
    this.MINI_SIZE = 0.2;

    //Explosion's Animation
    this.animationStatus = {
        INCREASING: 0,
        STOP:       1,
        DECREASING: 2,
        OVER:       -1,
    }
    this.animationCurrentStatus = this.animationStatus.INCREASING;
    this.stoped_time = 0;
    this.STOP_TIME = 0.4;
    

    //Explosion Texture
    this.explosionAppearance = new CGFappearance(this.scene);
    this.explosionAppearance.setAmbient(1, 1, 1, 1);
    this.explosionAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.explosionAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.explosionAppearance.setShininess(70);
    this.explosionAppearance.loadTexture("../resources/images/explosion.png");

    // Sounds
    this.sound = new Howl({
        src: ['../resources/sounds/explosion.m4a'] 
    });

    this.sound.play();
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
            this.scene.rotate(90 *this.scene.deg2rad, 0, 1, 0);
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
            this.scene.rotate(90 *this.scene.deg2rad, 0, 1, 0);
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

        this.scene.pushMatrix();
            this.scene.scale(this.MEDIUM_SIZE, this.MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.translate(this.MAIN_SIZE / 2, this.MAIN_SIZE / 3, 0);
            this.scene.rotate(90 *this.scene.deg2rad, 0, 1, 0);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(this.MAIN_SIZE , this.MAIN_SIZE * 1.4, 0);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.scene.rotate(45 * this.scene.deg2rad, 0, 1, 0);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(this.MAIN_SIZE, this.MEDIUM_SIZE, this.MAIN_SIZE);//this.MAIN_SIZE * 2, 0);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.scene.rotate(90 * this.scene.deg2rad, 0, 1, 0);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-this.MAIN_SIZE, -this.MAIN_SIZE, this.MEDIUM_SIZE);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.scene.rotate(-45 * this.scene.deg2rad, 0, 1, 0);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-this.MEDIUM_SIZE, this.MEDIUM_SIZE / 3, -this.MAIN_SIZE);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(this.MEDIUM_SIZE, -this. MAIN_SIZE, -this.MEDIUM_SIZE);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-this.SMALL_SIZE, this.MAIN_SIZE * 1.2, 0);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();
      
        this.scene.pushMatrix();
            this.scene.translate(this.MEDIUM_SIZE, -this. MEDIUM_SIZE, this.MEDIUM_SIZE);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-this.MINI_SIZE, this.MAIN_SIZE * 1.2, this.MEDIUM_SIZE);
            this.scene.scale(this.MINI_SIZE, this.MINI_SIZE, this.MINI_SIZE);
            this.sphereDisplay();
        this.scene.popMatrix();

    this.scene.popMatrix();
};

MyExplosion.prototype.update = function(deltaTime) {

    switch (this.animationCurrentStatus) {

        case this.animationStatus.INCREASING:
            this.explosionRadius += deltaTime * 0.001 * this.velocity;
            this.updateStatus();
            break;

        case this.animationStatus.STOP:
            this.stoped_time += deltaTime * 0.001;
            this.updateStatus();
            break;
        
        case this.animationStatus.DECREASING:
            this.explosionRadius -= deltaTime * 0.001 * 3 * this.velocity;
            this.updateStatus();
            break;
    }
};

MyExplosion.prototype.updateStatus = function() {

    switch (this.animationCurrentStatus) {

        case this.animationStatus.INCREASING:
            if (this.explosionRadius >= this.explosionMaxRadius)
                this.animationCurrentStatus = this.animationStatus.STOP;
            break;

        case this.animationStatus.STOP:
            if (this.stoped_time >= this.STOP_TIME)
                this.animationCurrentStatus = this.animationStatus.DECREASING;
            break;
        
        case this.animationStatus.DECREASING:
            if (this.explosionRadius <= 0)
                this.animationCurrentStatus = this.animationStatus.OVER;
            break;
    }

};

MyExplosion.prototype.getRadius = function() {
    return this.explosionRadius;
};

MyExplosion.prototype.sphereDisplay = function () {
    this.scene.pushMatrix();
        this.scene.rotate(180 * this.scene.deg2rad, 0, 1, 0);
        this.hemisphere.display();
    this.scene.popMatrix();  

    this.scene.pushMatrix();
        this.scene.rotate(180 * this.scene.deg2rad, 0, 0, 1);
        this.hemisphere.display();
    this.scene.popMatrix(); 
}

MyExplosion.prototype.isOver = function() {
    
    if (this.animationCurrentStatus == this.animationStatus.OVER)
        return true;
    else
        return false;
};

MyExplosion.prototype.isBig = function() {
    if (this.animationCurrentStatus != this.animationStatus.INCREASING)
        return true;
    else
        return false;
};