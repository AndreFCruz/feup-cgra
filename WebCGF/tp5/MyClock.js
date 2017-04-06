/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function  MyClock(scene) {
	CGFobject.call(this,scene);
	
	this.cylinder = new MyCylinder(this.scene, 12, 1);
	this.cylinder.initBuffers();

};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;


/*
MyClock.prototype.display = function() {
	
	// ?

}
*/

/*
MyClock.prototype.update = function() {
	
}
*/