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

    this.ang = 0;
    this.MAX_ANG = Math.PI / 4;
    this.MIN_ANG = Math.PI / -4;
    this.ANG_VEL = Math.PI; // radians per second
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

    //Left Side Rectangle
        -(this.bigSide / 2), -0.25, 1,
        -(this.smallSide / 2), -0.25, 0,
        -(this.bigSide / 2), 0.25, 1,
        -(this.smallSide / 2), 0.25, 0,
    
    //Right Side Rectangle
        (this.bigSide / 2), -0.250, 1,
        (this.smallSide / 2), -0.25, 0,
        (this.bigSide / 2), 0.25, 1,
        (this.smallSide / 2), 0.25, 0,
    
    //Front Side Rectangle
        -(this.bigSide / 2), -0.25, 1,
        (this.bigSide / 2), -0.250, 1,
        -(this.bigSide / 2), 0.25, 1,
        (this.bigSide / 2), 0.25, 1,

    //Back Side Rectangle
        -(this.smallSide / 2), -0.25, 0,
        (this.smallSide / 2), -0.25, 0,
        -(this.smallSide / 2), 0.25, 0,
        (this.smallSide / 2), 0.25, 0,
    ];

    var sideRatio = this.smallSide / this.bigSide;

    this.texCoords = [
    //Base Trapeze
        0, 1,
        1, 1,
        (1 - sideRatio) / 2, 0,
        1 - ((1 - sideRatio) / 2), 0,
    //Top Trapeze
        0, 1,
        1, 1,
        (1 - sideRatio) / 2, 0,
        1 - ((1 - sideRatio) / 2), 0,
    //Left Side Rectangle
        1, 1,
        0, 1,
        1, 0,
        0, 0,
    //Right Side Rectangle
        1, 1,
        0, 1,
        1, 0,
        0, 0,
    //Front Side Rectangle
        1, 1,
        0, 1,
        1, 0,
        0, 0,
    //Back Side Rectangle
        1, 1,
        0, 1,
        1, 0,
        0, 0,       
    ];

    this.indices = [
    //Base Trapeze
        0, 2, 1,
        3, 1, 2,
    //Top Trapeze
        4, 5, 6,
        7, 6, 5,
    //Left Side Rectangle
        10, 9, 8,
        9, 10, 11,
    //Right Side Rectangle
        12, 13, 14, 
        15, 14, 13,
    //Front Side Rectangle
        17, 18, 16,
        18, 17, 19,
    //Back Side Rectangle
        20, 22, 21,
        21, 22, 23,
    ];
    
    var ang = Math.atan(1 / (this.bigSide - this.smallSide / 2));

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
    //Left Side Rectangle Normals
        -Math.cos(ang), Math.sin(ang), 0,
        -Math.cos(ang), Math.sin(ang), 0,
        -Math.cos(ang), Math.sin(ang), 0,
        -Math.cos(ang), Math.sin(ang), 0,
    //Right Side Rectangle Normals
        Math.cos(ang), Math.sin(ang), 0,
        Math.cos(ang), Math.sin(ang), 0,         
        Math.cos(ang), Math.sin(ang), 0,        
        Math.cos(ang), Math.sin(ang), 0,
    //Front Side Rectangle Normals
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    //Back Side Rectangle Normals
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;

MyTrapeze.prototype.displayWithDir = function() {

    this.scene.pushMatrix();
        this.scene.rotate(this.ang, 1, 0, 0);
        this.display();
    this.scene.popMatrix();
}

MyTrapeze.prototype.update = function(deltaTime, rotation) {

    switch (rotation) {
        case 1:
        case -1:
            this.ang += this.ANG_VEL * rotation * deltaTime * 0.001;
            break;
        case 0:
            this.ang -= this.ang * this.ANG_VEL * 2 * deltaTime * 0.001;
            break;
        default:
            console.log("Invalid rotation value in Trapeze");
            break;
    }
    
    if (this.ang > this.MAX_ANG)
        this.ang = this.MAX_ANG;
    else if (this.ang < this.MIN_ANG)
        this.ang = this.MIN_ANG;

}