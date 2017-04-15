var degToRad = Math.PI / 180.0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    
    //Interface
    this.option1=true;
    this.option2=false;
    this.speed=3;

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
    this.ocean = new MyQuad(this, 0, 5, 0, 5);
    this.clockPost = new MyCylinder(this, 10, 1);
    this.submarine = new MySubmarine(this);

    //Interface Relagted Variables
    this.subAngRotation = 98;
    this.subXposition = 0;
    this.subZposition = 0;
    this.moveFactor = 0.05
    ;

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
    this.animationLastTime = 0;
    this.animationUpdateTime = 100;
    this.avgUpdate = 1000;
}
;

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
    //this.camera = new CGFcamera(0.4,0.2,500,vec3.fromValues(1, 30, 1),vec3.fromValues(5, 20, 5));

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);

    // SETUP
    this.lights[0].setAmbient(1, 1, 1, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1., 1., 1., 1.0);
    this.lights[0].enable();
}
;

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);
    //this.setGlobalAmbientLight(1, 1, 1, 1.0);
    
}
;

LightingScene.prototype.updateLights = function() {
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

    //Ocean
    this.pushMatrix();
        this.scale(32, 1, 32);
        this.rotate(-90 * this.deg2rad, 1, 0, 0);
        this.waterAppearance.apply();
        this.ocean.display();
    this.popMatrix();

    //Submarine
    this.pushMatrix();
        this.translate(this.subXposition, 0, this.subZposition);
        this.rotate(this.subAngRotation * this.deg2rad, 0, 1, 0);
        this.submarine.display();
    this.popMatrix();
    
    // ---- END Primitive drawing section

}
;

//Animation Functions
LightingScene.prototype.update = function(currTime) {
    this.clock.update(currTime);
};

LightingScene.prototype.doSomething = function () { 
    console.log("Doing something..."); 
};

//Interface Related Functions
LightingScene.prototype.rotateSubmarine = function (value) {
    this.subAngRotation += value;

    if (this.subAngRotation >= 360)
        this.subAngRotation -= 360;
};

LightingScene.prototype.moveSubmarine = function (direction) {
    this.subXposition += this.moveFactor * this.speed * direction * Math.sin(this.subAngRotation * this.deg2rad);
    this.subZposition += this.moveFactor * this.speed * direction * Math.cos(this.subAngRotation * this.deg2rad);
}