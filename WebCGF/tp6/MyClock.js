/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function  MyClock(scene, width = 0.2) {
	CGFobject.call(this,scene);

	this.width = width;
	
	this.cylinder = new MyCylinder(this.scene, 12, 1);
	this.cylinder.initBuffers();

	this.front = new MyCircle(this.scene, 12);
	this.front.initBuffers();

	this.hoursHand = new MyClockHand (this.scene, this.width, 0.45);
	this.hoursHand.initBuffers();
	this.hoursHand.setAngle(90);

	this.minutesHand = new MyClockHand (this.scene, this.width, 0.7);
	this.minutesHand.initBuffers();
	this.minutesHand.setAngle(180);

	this.secondsHand = new MyClockHand (this.scene, this.width, 0.55);
	this.secondsHand.initBuffers();
	this.secondsHand.setAngle(270);

	//Animation Controller
	this.lastTime = 0;
	this.updateTime = 1000;
	this.avgUpdate = 1000;

	// Materials
	this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.setAmbient(0.8, 0.8, 0.8, 1);
    this.clockAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.clockAppearance.setShininess(20);
    this.clockAppearance.loadTexture("../resources/images/clock.png");

    this.redHandAppearance = new CGFappearance(this.scene);
    this.redHandAppearance.setDiffuse(0.6, 0.1, 0.1, 1);

    this.blackHandAppearance = new CGFappearance(this.scene);
    this.blackHandAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
	
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;


MyClock.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.scene.scale(1, 1, this.width);
		this.cylinder.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.clockAppearance.apply();
		this.scene.translate(0, 0, this.width);
		this.front.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.width+0.05);
		this.blackHandAppearance.apply();
		this.hoursHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.width+0.04);
		this.blackHandAppearance.apply();
		this.minutesHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0, 0, this.width+0.06);
		this.redHandAppearance.apply();
		this.secondsHand.display();
	this.scene.popMatrix();
}


MyClock.prototype.update = function(currTime) {

	if (currTime - this.lastTime >= this.updateTime)
	{
		this.lastTime = currTime;

		//1s is the normal updateTime
		this.secondsHand.incAngle(360/ 60 * (this.updateTime / this.avgUpdate));
		this.minutesHand.incAngle(360 / 60 / 60 * (this.updateTime / this.avgUpdate));
		this.hoursHand.incAngle(360 / 60 / 60 / 12 * (this.updateTime / this.avgUpdate));
	}
}