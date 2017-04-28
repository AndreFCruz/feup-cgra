var degToRad = Math.PI / 180.0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    //Interface
    this.light_01 = true;
    this.light_02 = false;
    this.light_03 = true;
    this.light_04 = true;
    this.pauseClock = false;
    this.acceleration = 3; // check values TODO

    this.deg2rad = Math.PI / 180;
    
    this.enableTextures(true);
    
    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.153, 0.313, 0.525, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.clock = new MyClock(this);
    this.oceanFloor = new Plane(this, 10, 5);
    this.clockPost = new MyCylinder(this, 10, 1);
    this.submarine = new MySubmarine(this);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.waterAppearance = new CGFappearance(this);
    this.waterAppearance.setAmbient(0.3, 0.4, 0.4, 1);
    this.waterAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.waterAppearance.setSpecular(0.5, 0.3, 0.4, 1);
    this.waterAppearance.setShininess(40)
    this.waterAppearance.loadTexture("../resources/images/ocean.png");

    //Animation
    this.setUpdatePeriod(100);
}
;

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
    //this.camera = new CGFcamera(0.4,0.2,500,vec3.fromValues(1, 30, 1),vec3.fromValues(5, 20, 5));

    // Positions for four lights
    this.lights[0].setPosition(8, 6, 5, 1);
    this.lights[0].setVisible(true);

    this.lights[1].setPosition(-10, 6, 3, 1);
    this.lights[1].setVisible(true);

    this.lights[2].setPosition(10, 6, -9, 1);
    this.lights[2].setVisible(true);
    
    this.lights[3].setPosition(-3, 6, -5, 1);
    this.lights[3].setVisible(true);

    // SETUP
    this.lights[0].setAmbient(0.7, 0.7, 0.4, 1);
    this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.lights[0].setSpecular(0.6, 0.6, 0.3, 1.0);

    this.lights[1].setAmbient(0.9, 0.7, 0.3, 1);
    this.lights[1].setDiffuse(0.8, 0.6, 0.6, 1.0);
    this.lights[1].setSpecular(0.7, 0.7, 0.3, 1.0);

    this.lights[2].setAmbient(0.7, 0.7, 0.7, 1);
    this.lights[2].setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.lights[2].setSpecular(0.9, 0.5, 0.2, 1.0);

    this.lights[3].setAmbient(0.6, 0.6, 0.6, 1);
    this.lights[3].setDiffuse(0.6, 0.6, 0.6, 1.0);
    this.lights[3].setSpecular(0.6, 0.6, 0.6, 1.0);
}
;

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);
    //this.setGlobalAmbientLight(1, 1, 1, 1.0);
    
}
;

LightingScene.prototype.updateLights = function() {
    this.lightsCheck();
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section

    // ---- BEGIN Primitive drawing section

    //Clock's Post
    this.pushMatrix();
        this.translate(8, 0, -0.9);
        this.scale(1, 7, 1);
        this.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.clockPost.display();
    this.popMatrix();

    // Clock
    this.pushMatrix();
        this.translate(8, 5, 0);
        this.scale(0.7, 0.7, 0.7);
        this.clock.display();
    this.popMatrix();

    //oceanFloor
    this.pushMatrix();
        this.scale(32, 1, 32);
        this.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.waterAppearance.apply();
        this.oceanFloor.display();
    this.popMatrix();

    //Submarine
    this.submarine.display();
    
    // ---- END Primitive drawing section

}
;

//Animation Functions
LightingScene.prototype.update = function(currTime) {
    if (!this.pauseClock)
        this.clock.update(currTime);

    
};

LightingScene.prototype.doSomething = function () { 
    console.log("Doing something...");
};

LightingScene.prototype.lightsCheck = function () {
   
    if(this.light_01)
        this.lights[0].enable();
    else this.lights[0].disable();

    if(this.light_02)
        this.lights[1].enable();
    else this.lights[1].disable();

    if(this.light_03)
        this.lights[2].enable();
    else this.lights[2].disable();
    
    if(this.light_04)
        this.lights[3].enable();
    else this.lights[3].disable();
};

LightingScene.prototype.getSubmarine = function () { 
    return this.submarine;
};