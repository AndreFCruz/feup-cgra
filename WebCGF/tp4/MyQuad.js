/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyQuad(scene) {
    CGFobject.call(this, scene);

    this.initBuffers();
}
;
MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
    this.vertices = [
        -0.5, -0.5, 0,
        -0.5, 0.5, 0,
        0.5, 0.5, 0,
        0.5, -0.5, 0
    ];

    this.indices = [
        0, 3, 1,
        3, 2, 1
    ];

    this.texCoords = [
        0, 1,
        0, 0,
        1, 0,
        1, 1
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;