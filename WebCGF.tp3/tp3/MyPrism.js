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
                1 + 2 * sl + this.slices * 2 * st,
                2 * (sl + 1) % (this.slices * 2) + (this.slices * 2) * st,
                (1 + 2 * (sl + this.slices)) + this.slices * 2 * st]);

            this.indices = this.indices.concat([
                2 * (sl + 1) % (this.slices * 2) + (this.slices * 2) * st,
                2 * (sl + 1 + this.slices) + this.slices * 2 * st >= this.vertices.length / 3 ? 2 * (sl + 1 + this.slices) + (this.slices * (2 * st - 2)) : 2 * (sl + 1 + this.slices) + this.slices * 2 * st,
                1 + 2 * (sl + this.slices) + this.slices * 2 * st]);
        }

    }


    // Normals
    for (var i = 0; i <= this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {

          this.normals = this.normals.concat([
              Math.cos(radsConst * j - radsConst / 2),
              Math.sin(radsConst * j - radsConst / 2),
              0]);

          this.normals = this.normals.concat([
              Math.cos(radsConst * j + radsConst / 2),
              Math.sin(radsConst * j + radsConst / 2),
              0]);
              
        }
    }

    
    /* Bottom */
    var center_bot = (this.vertices.length / 3);
    this.vertices = this.vertices.concat([0, 0, 0]);
    this.normals = this.normals.concat([0, 0, -1]);
    
    for (var i = 0; i < this.slices; i++) {
        this.indices = this.indices.concat([i * 2, center_bot, (i + 1) * 2 % (this.slices * 2)]);
    }

    /* Top */
    var center_top = (this.vertices.length / 3);
    this.vertices = this.vertices.concat([0, 0, 1]);
    this.normals = this.normals.concat([0, 0, 1]);
    
    for (var i = this.stacks * this.slices * 2; i < (this.slices * 2) + this.stacks * this.slices * 2; i += 2) {
        this.indices = this.indices.concat([center_top, i, (i + 2) >= this.slices * 2 * (this.stacks + 1) ? i + 2 - this.slices * 2 : i + 2]);
    }

    

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
