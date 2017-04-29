/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();

    this.deg2rad = Math.PI / 180;

    this.MAX_VEL = 3; // max Vel in world units per second
    this.velocity = 0;

    this.pos_x = 0;
    this.pos_z = 0;

    this.ang = 98;
    this.ANG_INCREMENT = 2;

    this.lastUpdateTime = 0;

    // Shapes
    this.cylinder = new MyCylinder(this.scene, 12, 1);


    // Materials
    this.materialDefault = new CGFappearance(this);
}
;
MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function() {
    this.vertices = [
        0.5, 0.3, 0,
        -0.5, 0.3, 0,
        0, 0.3, 2
    ];

    this.indices = [
        0, 1, 2
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;

MySubmarine.prototype.update = function(currTime) {
    var deltaTime = currTime - this.lastUpdateTime;
    this.lastUpdateTime = currTime;

    this.pos_x += 0.001 * deltaTime * this.velocity * Math.sin(this.ang * this.deg2rad);
    this.pos_z += 0.001 * deltaTime * this.velocity * Math.cos(this.ang * this.deg2rad);

    //console.log("Submarine pos: " + this.pos_x + ", " + this.pos_z);
}

MySubmarine.prototype.display = function() {
    this.scene.materialDefault.apply();

    this.scene.pushMatrix();
        this.scene.translate(this.pos_x, 0, this.pos_z);
        this.scene.rotate(this.ang * this.deg2rad, 0, 1, 0);
        
        this.cylinder.display();
        
    this.scene.popMatrix();
}

MySubmarine.prototype.moveForward = function() {
    this.velocity += this.scene.acceleration;
    console.log("Move Forward: incremented velocity to " + this.velocity);
}

MySubmarine.prototype.moveBackward = function() {
    this.velocity -= this.scene.acceleration;
    console.log("Move Backward: decremented velocity to " + this.velocity);
}

MySubmarine.prototype.rotateLeft = function() {
    this.ang += this.ANG_INCREMENT;

    if (this.ang > 360)
        this.ang -= 360;
    else if (this.ang < 0)
        this.ang += 360;

    console.log("Rotate Left. Ang: " + this.ang);
}

MySubmarine.prototype.rotateRight = function() {
    this.ang -= this.ANG_INCREMENT;

    if (this.ang > 360)
        this.ang -= 360;
    else if (this.ang < 0)
        this.ang += 360;

    console.log("Rotate Right. Ang: " + this.ang);
}

/*
MySubmarine.prototype.setVelocity = function(new_vel) {
    this.velocity = new_vel;
}
*/