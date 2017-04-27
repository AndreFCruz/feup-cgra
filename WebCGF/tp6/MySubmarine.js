/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MySubmarine(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();

    this.deg2rad = Math.PI / 180;

    this.MAX_VEL = 100; // max Vel in world units per second
    this.velocity = 0;

    this.pos_x = 0;
    this.pos_z = 0;

    this.ang = 98;
    this.ANG_INCREMENT = 2;

    this.lastUpdateTime;
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

    this.pos_x += this.deltaTime * this.velocity * Math.sin(this.ang * this.deg2rad);
    this.pos_y += this.deltaTime * this.velocity * Math.cos(this.ang * this.deg2rad);
    
}

MySubmarine.prototype.display = function() {
    // TODO
}

MySubmarine.prototype.goForward = function() {
    this.velocity += this.scene.acceleration;
}

MySubmarine.prototype.goBackward = function() {
    this.velocity -= this.scene.acceleration;
}

MySubmarine.prototype.rotateLeft = function() {
    this.ang += this.ANG_INCREMENT;

    if (this.ang > 360)
        this.ang -= 360;
    else if (this.ang < 0)
        this.ang += 360;
}

MySubmarine.prototype.rotateRight = function() {
    this.ang -= this.ANG_INCREMENT;

    if (this.ang > 360)
        this.ang -= 360;
    else if (this.ang < 0)
        this.ang += 360;
}

MySubmarine.prototype.setVelocity = function(new_vel) {
    this.velocity = new_vel;
}
