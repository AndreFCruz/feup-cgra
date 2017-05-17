/**
 * MyHelix
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHelix(scene, slices, stacks, sphereStacks, positive = true) {
	CGFobject.call(this,scene);

	this.positive = positive;

	// State variables
	this.ang = Math.PI / 2 * (positive ? 1 : -1);
	
	//Shapes
	this.cylinderInside = new MyCylinderWInside(this.scene, slices, stacks);
	this.parallelepiped = new MyUnitCubeQuad(this.scene);
	this.semisphere = new MySemiSphere(this.scene, slices, sphereStacks);
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor=MyHelix;

MyHelix.prototype.display = function() {
	    
	this.scene.pushMatrix();
        this.cylinderInside.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(this.ang, 0, 0, 1);
		this.scene.translate(0, 0, 0.5);
		this.scene.scale(1.7, 0.4, 0.3);
		this.parallelepiped.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(0, 0, 0, 1);
		this.scene.translate(0, 0, 0.5);
		this.scene.scale(0.3, 0.3, 0.3);
		this.semisphere.display();
	this.scene.popMatrix();

}

MyHelix.prototype.update = function(deltaTime, subVel) {
	// angular velocity in radians per second
	var ang_vel = (subVel >= 0 ? 1 : -1) * 2 * Math.PI + subVel;

	this.ang += (this.positive ? 1 : -1) * deltaTime * ang_vel * 0.001;

	if (this.ang > Math.PI * 2)
		this.ang -= Math.PI * 2;
	else if (this.ang < 0)
		this.ang += Math.PI * 2;

	console.log("-- Vel: " + ang_vel + ". Ang: " + this.ang + " -- ");
}