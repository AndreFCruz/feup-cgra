/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function  MyClock(scene, width = 0.2) {
	CGFobject.call(this,scene);

	this.width = width;
	
	this.cylinder = new MyCylinder(this.scene, 12, 1);
	this.cylinder.initBuffers();

	this.front = new MyCircle(this.scene, 12);
	this.front.initBuffers();


	// Materials
	this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.clockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.clockAppearance.setShininess(20);
    this.clockAppearance.loadTexture("../resources/images/clock.png");
	
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;


MyClock.prototype.display = function() {
	
	this.scene.pushMatrix();
	this.scene.scale(1, 1, this.width);
	this.cylinder.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.clockAppearance.apply();
	this.scene.translate(0, 0, this.width);
	this.front.display();
	this.scene.popMatrix();
}


/*
MyClock.prototype.update = function() {
	
}
*/