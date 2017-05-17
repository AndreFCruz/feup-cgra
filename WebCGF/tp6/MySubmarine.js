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

    this.vertical_vel = 0;
    this.VERT_ACCEL = 0.2;
    this.MAX_VERT_VEL = 2;

    this.ang = 98;
    this.ang_vel = 0;
    this.ang_accel = 20;
    this.MAX_ANG_VEL = 100;

    this.lastUpdateTime = 0;

    this.upwards = false;
    this.downwards = false;

    this.rotating_left = false;
    this.rotating_right = false;

    this.dampening_vel = false;
    this.dampening_ang_vel = false;
    this.dampen_constant = 2;

    this.pivot = [0, 0];

    // Periscope Vars
    this.MAX_PERISCOPE = 1;
    this.MIN_PERISCOPE = -0.3;
    this.periscope_y = 0;
    this.PERISCOPE_DELTA = 0.05;

    // Shapes
    this.cylinder = new MyCylinder(this.scene, 12, 1);
    this.semisphere = new MySemiSphere(this.scene, 12, 6);
    this.circle = new MyCircle(this.scene, 12);
    this.trapezeTailVert = new MyTrapeze(this.scene, 1.64, 2.34);
    this.trapezeTailHorz = new MyTrapeze(this.scene, 1.64, 2.34);
    this.trapezeTower = new MyTrapeze(this.scene, 1.1, 1.42);
    this.helixLeft = new MyHelix(this.scene, 12, 1, 6, false);
    this.helixRight = new MyHelix(this.scene, 12, 1, 6, true);

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

    // Update Fins
    var rotation = 0;
    if (this.rotating_left) {
        rotation = 1;
    } else if (this.rotating_right) {
        rotation = -1;
    }
    this.trapezeTailVert.update(deltaTime, rotation);

    rotation = 0;
    if (this.downwards) {
        rotation = 1;
    } else if (this.upwards) {
        rotation = -1;
    }
    this.trapezeTower.update(deltaTime, rotation);
    this.trapezeTailHorz.update(deltaTime, rotation);

    // Update helix
    this.helixLeft.update(deltaTime, this.velocity);
    this.helixRight.update(deltaTime, this.velocity);

    this.pos_x += 0.001 * deltaTime * this.velocity * Math.sin(this.ang * this.deg2rad);
    this.pos_z += 0.001 * deltaTime * this.velocity * Math.cos(this.ang * this.deg2rad);
    this.pos_y += 0.001 * deltaTime * this.vertical_vel;

    this.ang += 0.001 * deltaTime * this.ang_vel;

    // Simulate friction -- Dampen velocities
    if (this.dampening_ang_vel)
        this.ang_vel -= (this.ang_vel * this.dampen_constant * 0.001 * deltaTime);
    if (this.dampening_vel)
        this.velocity -= (this.velocity * this.dampen_constant * 0.1 * 0.001 * deltaTime);

    // Vertical friction
    if (! this.upwards && !this.downwards)
        this.vertical_vel -= this.vertical_vel * this.dampen_constant * 0.1 * 0.001 * deltaTime;

    // Update pivot's position
    this.pivot = [1.5 * Math.sin(this.ang * this.deg2rad), 1.5 * Math.cos(this.ang * this.deg2rad)];
}

MySubmarine.prototype.display = function() {
    
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

        // ** Subamrine's Periscope **
        this.scene.pushMatrix();
            this.scene.translate(0, this.periscope_y, 0);

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

        this.scene.popMatrix();
        // END OF Periscope

        // ** Submarine's 'Fins' **
        // VERTICAL
        this.scene.pushMatrix();
            this.scene.rotate(-90 * this.scene.deg2rad, 0, 0, 1);
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.scene.scale(1, 0.3, 0.2);

            this.trapezeTailVert.displayWithDir();
            
        this.scene.popMatrix();

        // HORIZONTAL
        this.scene.pushMatrix();
            this.scene.rotate(180 * this.scene.deg2rad, 1, 0, 0);
            this.scene.scale(1, 0.3, 0.2);

            this.trapezeTailHorz.displayWithDir();

        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0 , 0.8, 2.40);
            this.scene.scale(1, 0.15, 0.25);

            this.trapezeTower.displayWithDir();

        this.scene.popMatrix();

        //Subamrine's Helix
        this.scene.pushMatrix();
            this.scene.translate(0.73/2 + 0.15, -0.3, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.helixLeft.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.73/2 - 0.15, -0.3, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.helixRight.display();
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
    this.rotating_left = true;
    this.rotating_right = false;

    this.ang_vel += this.ang_accel;

    if (this.ang_vel > this.MAX_ANG_VEL)
        this.ang_vel = this.MAX_ANG_VEL;
}

MySubmarine.prototype.rotatingRight = function() {
    this.dampening_ang_vel = false;
    this.rotating_right = true;
    this.rotating_left = false;

    this.ang_vel -= this.ang_accel;

    if (this.ang_vel < -this.MAX_ANG_VEL)
        this.ang_vel = -this.MAX_ANG_VEL;
}

MySubmarine.prototype.dampenAngVel = function() {
    this.dampening_ang_vel = true;
    this.rotating_left = false;
    this.rotating_right = false;
}

MySubmarine.prototype.movingUpwards = function() {
    this.upwards = true;
    this.downwards = false;

    this.vertical_vel += this.VERT_ACCEL;

    if (this.vertical_vel > this.MAX_VERT_VEL)
        this.vertical_vel = this.MAX_VERT_VEL;
}

MySubmarine.prototype.movingDownwards = function() {
    this.upwards = false;
    this.downwards = true;

    this.vertical_vel -= this.VERT_ACCEL;

    if (this.vertical_vel < -this.MAX_VERT_VEL)
        this.vertical_vel = -this.MAX_VERT_VEL;
}

MySubmarine.prototype.dampenVerticalVel = function() {
    this.upwards = false;
    this.downwards = false;
}

MySubmarine.prototype.raisePeriscope = function() {
    this.periscope_y += this.PERISCOPE_DELTA;

    if (this.periscope_y > this.MAX_PERISCOPE)
        this.periscope_y = this.MAX_PERISCOPE;
}

MySubmarine.prototype.lowerPeriscope = function() {
    this.periscope_y -= this.PERISCOPE_DELTA;

    if (this.periscope_y < this.MIN_PERISCOPE)
        this.periscope_y = this.MIN_PERISCOPE;
}