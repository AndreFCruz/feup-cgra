/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/


	this.vertices = [];	// center vertice
	this.indices = [];
	this.normals = [];
	
	var radsConst = (Math.PI / 180) * (360 / this.slices);
	var deltaZ = 1 / this.stacks;

	// Vertices
	for (var i = 0; i <= this.stacks; i++) {
		for (var j = 0; j < this.slices; j++) {
			var new_vertex = [Math.cos(radsConst * j), Math.sin(radsConst * j), i * deltaZ];

			this.vertices = this.vertices.concat(new_vertex);
			this.vertices = this.vertices.concat(new_vertex);
		}
	}

	// Indices
	for (var sl = 0; sl < this.slices; sl += 2) {
		
		for (var st = 0; st < this.stacks; st++) {
			var next_idx = sl + this.slices * 2;
			this.indices = this.indices.concat([2 * (sl + (this.slices)), 2 * (sl + (st * this.slices)), 2 * (sl + 1 + (this.slices))]);
			this.indices = this.indices.concat([2 * (sl + 1), 2 * (sl + (st * this.slices) + 1 + (this.slices)), 2 * sl]);
		}
		
	}

	// Normals - TODO
	for (var i = 0; i < this.vertices.length; i++) {
		this.normals = this.normals.concat([0, 0, 1]);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
