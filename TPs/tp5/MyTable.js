/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	
	this.cube = new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();

	this.tableAppearance = new CGFappearance(this.scene);
    this.tableAppearance.setAmbient(0.2, 0.15, 0.07, 1);
    this.tableAppearance.setDiffuse(0.2, 0.15, 0.07, 1);
    this.tableAppearance.setSpecular(0.1, 0.1, 0.05, 1);
    this.tableAppearance.setShininess(10);

	this.tableTop = new CGFappearance(this.scene);
    this.tableTop.setAmbient(0.8, 0.8, 0.8, 1);
    this.tableTop.setDiffuse(0.8, 0.8, 0.8, 1);
    this.tableTop.setSpecular(0.1, 0.1, 0.1, 1);
    this.tableTop.setShininess(10);
    this.tableTop.loadTexture("../resources/images/table.png");
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {
	
	// Tampo
	this.scene.pushMatrix();
	this.scene.translate(0, 3.5 + 0.3 / 2, 0);
	this.scene.scale(5, 0.3, 3);
	this.tableTop.apply();
    this.cube.display();
    this.scene.popMatrix();

	this.tableAppearance.apply();
    // Pernas
    // primeiro octante
    this.scene.pushMatrix();
    this.scene.translate(2, 3.5/2, 1);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();


    // segundo octante
    this.scene.pushMatrix();
    this.scene.translate(2, 3.5/2, -1);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();

	// terceiro octante
    this.scene.pushMatrix();
    this.scene.translate(-2, 3.5/2, -1);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();

    // quarto octante
    this.scene.pushMatrix();
    this.scene.translate(-2, 3.5/2, 1);
	this.scene.scale(0.3, 3.5, 0.3);
	this.cube.display();
    this.scene.popMatrix();
	
}