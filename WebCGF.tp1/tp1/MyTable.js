/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	
	this.cube = new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {
	
	this.scene.pushMatrix();

	// Used to center table
	this.scene.translate(0, 1.9, 0);

	// Tampo
	this.scene.pushMatrix();
	this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

    // Pernas
    // primeiro octante
    this.scene.pushMatrix();
    this.scene.translate(5/2 - .3, -3.5/2 - 0.3/2, 3/2 - .3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();


    // segundo octante
    this.scene.pushMatrix();
    this.scene.translate(5/2 - .3, -3.5/2 - 0.3/2, -3/2 + .3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();

	// terceiro octante
    this.scene.pushMatrix();
    this.scene.translate(-5/2 + .3, -3.5/2 - 0.3/2, -3/2 + .3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();

    // quarto octante
    this.scene.pushMatrix();
    this.scene.translate(-5/2 + .3, -3.5/2 - 0.3/2, 3/2 - .3);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
	
}