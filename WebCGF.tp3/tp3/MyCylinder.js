/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {
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
        }
    }

    // Indices
    for (var sl = 0; sl < this.slices; sl++) {
        
        for (var st = 0; st < this.stacks; st++) {
            this.indices = this.indices.concat([
                sl + this.slices * st,
                (sl + 1) % this.slices + this.slices * st,
                (sl + this.slices) + this.slices * st
                /*(sl + 1 + this.slices * (st+1)) < this.vertices.length / 3 ? sl + 1 + this.slices * (st+1) : sl + 1 + this.slices * st*/]);

            this.indices = this.indices.concat([
                (sl + 1) % this.slices + this.slices * st,
                (sl + 1 + this.slices * (st+1)) < this.vertices.length / 3 ? sl + 1 + this.slices * (st+1) : sl + 1 + this.slices * st,
                sl + this.slices * (st+1)])

        }

    }


    // Normals
    for (var i = 0; i <= this.stacks; i++) {
        for (var j = 0; j < this.slices; j++) {

          this.normals = this.normals.concat([
              Math.cos(radsConst * j),
              Math.sin(radsConst * j),
              0]);

        }
    }


    // NOTE: Top and Bottom - normals are shared with sides' normals, imperfect lightning

    /* Bottom */
    var center_bot = (this.vertices.length / 3);
    this.vertices = this.vertices.concat([0, 0, 0]);
    this.normals = this.normals.concat([0, 0, -1]);
    
    for (var i = 0; i < this.slices; i++) {
        this.indices = this.indices.concat([i, center_bot, (i + 1) % this.slices]);
    }

    /* Top */
    var center_top = (this.vertices.length / 3);
    this.vertices = this.vertices.concat([0, 0, 1]);
    this.normals = this.normals.concat([0, 0, 1]);
    
    for (var i = this.stacks * this.slices; i < this.slices + this.stacks * this.slices; i++) {
        //this.indices = this.indices.concat([center_top, i, (i + 2) >= this.slices * 2 * (this.stacks + 1) ? i + 2 - this.slices * 2 : i + 2]);
        this.indices = this.indices.concat([
            center_top, i, (i + 1) < (this.vertices.length / 3 - 2) ? i + 1 : i + 1 - this.slices]);
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
