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
    this.pos_y = 0.5; // Altitude

    this.ang = 98;
    this.ang_vel = 0;
    this.ang_accel = 20;
    this.MAX_ANG_VEL = 100;

    this.lastUpdateTime = 0;

    this.dampening_vel = false;
    this.dampening_ang_vel = false;
    this.dampen_constant = 2;

    this.pivot = [0, 0];

    // Shapes
    this.cylinder = new MyCylinder(this.scene, 12, 1);
    this.semisphere = new MySemiSphere(this.scene, 12, 6);
    this.circle = new MyCircle(this.scene, 12);
    this.trapezeTail = new MyTrapeze(this.scene, 1.64, 2.34);
    this.trapezeTower = new MyTrapeze(this.scene, 1.1, 1.42);
    this.helix = new MyHelix(this.scene, 12, 1, 6);

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

    this.ang += 0.001 * deltaTime * this.ang_vel;

    // Simulate friction -- Dampen velocities
    if (this.dampening_ang_vel)
        this.ang_vel -= (this.ang_vel * this.dampen_constant * 0.001 * deltaTime);
    if (this.dampening_vel)
        this.velocity -= (this.velocity * this.dampen_constant * 0.1 * 0.001 * deltaTime);

    // Update pivot's position
    this.pivot = [1.5 * Math.sin(this.ang * this.deg2rad), 1.5 * Math.cos(this.ang * this.deg2rad)];
}

MySubmarine.prototype.display = function() {
    this.scene.materialDefault.apply();
    
    this.scene.pushMatrix();
        this.scene.translate(- this.pivot[0], this.pos_y, - this.pivot[1]);

        this.scene.translate(this.pos_x, 0, this.pos_z);
        this.scene.rotate(this.ang * this.deg2rad, 0, 1, 0);

        //Main Body
        this.scene.pushMatrix();
            this.scene.scale(0.365, 0.5, 4.08);
            this.cylinder.display();
        this.scene.popMatrix();

        //Submarine's front
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 4.08);
            this.scene.scale(0.365, 0.5, 0.46);
            this.semisphere.display();
        this.scene.popMatrix();

        //Subsmarine's Back
        this.scene.pushMatrix();
            this.scene.rotate(180 * this.deg2rad, 0, 1, 0);
            this.scene.scale(0.365, 0.5, 0.46);
            this.semisphere.display();
        this.scene.popMatrix();

        //Submarine's Tower
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 2.50);
            this.scene.scale(0.27 , 1.07, 0.44);
            this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        //Submarine's Tower Top
        this.scene.pushMatrix();
            this.scene.translate(0, 1.07, 2.50);
            this.scene.scale(0.27 , 1, 0.44);
            this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        //Subamrine's Periscope
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 2.65);
            this.scene.scale(0.10 , 1.65, 0.10);
            this.scene.rotate(-90 * this.deg2rad, 1, 0, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 1.65, 2.55);
            this.scene.scale(0.10 , 0.10, 0.30);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 1.65, 2.85);
            this.scene.scale(0.10 , 0.10, 1);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 1.65, 2.55);
            this.scene.scale(0.10 , 0.10, 1);
            this.scene.rotate(180 * this.deg2rad, 0, 1, 0);
            this.circle.display();
        this.scene.popMatrix();

        //Submarine's 'Fins'
        this.scene.pushMatrix();
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.scene.scale(1, 0.3, 0.2);
            this.trapezeTail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(-90 * this.scene.deg2rad, 0, 0, 1);
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.scene.scale(1, 0.3, 0.2);
            this.trapezeTail.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0 , 0.8, 2.40);
            this.scene.scale(1, 0.15, 0.25);
            this.trapezeTower.display();
        this.scene.popMatrix();

        //Subamrine's Helix
        this.scene.pushMatrix();
            this.scene.translate(0.73/2 + 0.15, -0.3, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.helix.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.73/2 - 0.15, -0.3, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.helix.display();
        this.scene.popMatrix();

    this.scene.popMatrix();
}

MySubmarine.prototype.movingForward = function() {
    this.dampening_vel = false;
    this.velocity += this.scene.acceleration;

    if (this.velocity > this.MAX_VEL)
        this.velocity = this.MAX_VEL;
}

MySubmarine.prototype.movingBackward = function() {
    this.dampening_vel = false;
    this.velocity -= this.scene.acceleration;
    
    if (this.velocity < - this.MAX_VEL)
        this.velocity = - this.MAX_VEL;
}

MySubmarine.prototype.dampenVel = function() {
    this.dampening_vel = true;
}

MySubmarine.prototype.rotatingLeft = function() {
    this.dampening_ang_vel = false;

    this.ang_vel += this.ang_accel;

    if (this.ang_vel > this.MAX_ANG_VEL)
        this.ang_vel = this.MAX_ANG_VEL;
}

MySubmarine.prototype.rotatingRight = function() {
    this.dampening_ang_vel = false;

    this.ang_vel -= this.ang_accel;

    if (this.ang_vel < -this.MAX_ANG_VEL)
        this.ang_vel = -this.MAX_ANG_VEL;
}

MySubmarine.prototype.dampenAngVel = function() {
    this.dampening_ang_vel = true;
}


/*
MySubmarine.prototype.moveForward = function() {
    this.velocity += this.scene.acceleration;

    if (this.velocity > this.MAX_VEL)
        this.velocity = this.MAX_VEL;
}

MySubmarine.prototype.moveBackward = function() {
    this.velocity -= this.scene.acceleration;
    
    if (this.velocity < - this.MAX_VEL)
        this.velocity = - this.MAX_VEL;
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
*/
