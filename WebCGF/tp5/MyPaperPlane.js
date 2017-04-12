/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyPaperPlane(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();
}
;
MyPaperPlane.prototype = Object.create(CGFobject.prototype);
MyPaperPlane.prototype.constructor = MyPaperPlane;

MyPaperPlane.prototype.initBuffers = function() {
    this.vertices = [
        0, 0, 0,
        1, 0, 0,
        1, 0.5, 0,
        1, 0.5, 0.5,
        1, 0.5, -0.5
    ];

    this.indices = [
        0, 1, 2,
        2, 1, 0,
        0, 2, 3,
        3, 2, 0,
        0, 2, 4,
        4, 2, 0
    ];

    this.normals = [
        0, 0, 1,
        0, 0, -1,
        1, -2, 0,
        -1, 2, 0,
        -1, 2, 0,
        1, -2, 0
    ];
    
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
