/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene, width, size = 1) {
	CGFobject.call(this,scene);
	
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();

	this.clockWidth = width;
	this.size = size;
	this.ang = 0;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.scene.rotate(-this.ang * Math.PI/ 180, 0, 0, 1);
		this.scene.translate(0,this.size/ 2,0);
		this.scene.scale(this.clockWidth/8 , this.size, 1);
		this.quad.display();
	this.scene.popMatrix();
}

MyClockHand.prototype.setAngle = function(ang) {
	this.ang = ang;
}

MyClockHand.prototype.incAngle = function (inc) {
	this.ang += inc;
}