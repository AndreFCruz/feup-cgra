/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {
    /*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

    this.vertices = [];
    // center vertice
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
    for (var sl = 0; sl < this.slices; sl++) {
        
        for (var st = 0; st < this.stacks; st++) {
            this.indices = this.indices.concat([
                2 * sl + this.slices * 2 * st,
                2 * (sl + 1) % (this.slices * 2) + (this.slices * 2) * st,
                2 * (sl + this.slices) + this.slices * 2 * st]);

            this.indices = this.indices.concat([
                2 * (sl + 1) % (this.slices * 2) + (this.slices * 2) * st,
                2 * (sl + 1 + this.slices) + this.slices * 2 * st >= this.vertices.length / 3 ? 2 * (sl + 1 + this.slices) + (this.slices * (2 * st - 2)) : 2 * (sl + 1 + this.slices) + this.slices * 2 * st,
                (2 * (sl + this.slices) + this.slices * 2 * st)]);
        }

    }


    // Normals - TODO
    for (var i = 0; i < this.vertices.length; i++) {
        this.normals = this.normals.concat([0, 0, 1]);
    }

    /*
    this.vertices.push([0, 0, 0]);
    //this.vertices.push([0, 0, 1]);

    var center_idx = (this.vertices.length / 3) - 1;
    
    // Top and Bottom
    for (var i = 0; i + 1 < this.slices; i++) {
        this.indices = this.indices.concat([center_idx, i * 2, (i + 1) * 2]);
    }
    */

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
