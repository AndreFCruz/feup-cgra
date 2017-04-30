/**
 * MyHelix
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyHelix(scene, slices, stacks, sphereStacks) {
	CGFobject.call(this,scene);
	
	//Shapes
	this.cylinderInside = new MyCylinderWInside(this.scene, slices, stacks);
	this.parallelepiped = new MyUnitCubeQuad(this.scene);
	this.semisphere = new MySemiSphere(this.scene, slices, sphereStacks);
};

MyHelix.prototype = Object.create(CGFobject.prototype);
MyHelix.prototype.constructor=MyHelix;

MyHelix.prototype.display = function() {
	    
	this.scene.pushMatrix();
        //this.scene.translate(0.73/2, -0.3, 0.2);
        //this.scene.scale(0.2, 0.2, 0.2);
        this.cylinderInside.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(45 * this.scene.deg2rad, 0, 0, 1);
		this.scene.translate(0, 0, 0.5);
		this.scene.scale(1.7, 0.4, 0.3);
		this.parallelepiped.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.rotate(45 * this.scene.deg2rad, 0, 0, 1);
		this.scene.translate(0, 0, 0.5);
		this.scene.scale(0.3, 0.3, 0.3);
		this.semisphere.display();
	this.scene.popMatrix();

}