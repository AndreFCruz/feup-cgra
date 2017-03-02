/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;


MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5,	// seventh octant
            -0.5, -0.5, 0.5,	// eighth octant
            -0.5, 0.5, -0.5,	// third octant
            -0.5, 0.5, 0.5,		// fourth octant
            0.5, -0.5, -0.5,	// sixth octant
            0.5, -0.5, 0.5,		// fifth octant
            0.5, 0.5, -0.5,		// second octant
            0.5, 0.5, 0.5		// first octant
        ];
		
	this.indices = [
            0, 1, 2,
            3, 2, 1,
            4, 6, 5,
            6, 7, 5,
            2, 3, 6,
            6, 3, 7,
            1, 7, 3,
            1, 5, 7,
            0, 4, 1,
            4, 5, 1,
            0, 2, 4,
            2, 6, 4
        ];

	this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


/*
class MyUnitCube extends CGFobject {
	constructor (scene) {
		super(scene);
        initBuffers();
    };
    
	initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5
        ];

		this.indices = [
			0, 1, 2,
			3, 2, 1
		];

        this.primitiveType = this.scene.gl.TRIANGLES_STRIP;
        this.initGLBuffers();
    }
}
*/