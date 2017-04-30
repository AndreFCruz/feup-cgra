/**
 * MyTrapeze
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapeze(scene, side1, side2) {
    CGFobject.call(this, scene);

    if (side1 < side2) {
        this.smallSide = side1;
        this.bigSide = side2;
    } else {
        this.smallSide = side2;
        this.bigSide = side1;
    }
    
    this.initBuffers();
}
;
MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.initBuffers = function() {
    this.vertices = [
    //Base Trapeze
        -(this.bigSide / 2), -0.25, 1,
        (this.bigSide / 2), -0.250, 1,
        -(this.smallSide / 2), -0.25, 0,
        (this.smallSide / 2), -0.25, 0,
    //Top Trapeze
        -(this.bigSide / 2), 0.25, 1,
        (this.bigSide / 2), 0.25, 1,
        -(this.smallSide / 2), 0.25, 0,
        (this.smallSide / 2), 0.25, 0,
    ];

    this.indices = [
    //Trapezes
        0, 2, 1,
        3, 1, 2,
        4, 5, 6,
        7, 6, 5,
    //Sides of the 3d Shape, unifying the trapezes
        0, 1, 4,
        5, 4, 1,
        2, 6, 3,
        6, 7, 3,
        1, 3, 5,
        7, 5, 3,
        0, 4, 2,
        4, 6, 2,
    ];
    
    this.normals = [
    //Base Trapeze Normals
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
    //Top Trapezes Normals
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
