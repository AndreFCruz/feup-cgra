/**
 * MyExplosion
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyExplosion(scene, pos, velocity) {
    CGFobject.call(this, scene);
    
    //Array containting the Position Coordinates
    this.position = [
        pos[0],
        pos[1],
        pos[2],
    ];

    this.velocity = velocity;

    //Shapes
    this.hemisphere = new MySemiSphere(this.scene, 12, 6);

    //Radius of the current explosion
    this.explosionRadius = 0;
    //this.explosion = new MyExplosion(this.scene, position);

    //Explosion's Update
    //TODO
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {
    //Esfera grande no meia com esferas pequenas a volta - todas elas com a sua textura aplicada
};

MyExplosion.prototype.update = function(deltaTime) {

};