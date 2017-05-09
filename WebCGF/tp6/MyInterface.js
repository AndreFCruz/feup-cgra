/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light_01');
	group.add(this.scene, 'light_02');
	group.add(this.scene, 'light_03');
	group.add(this.scene, 'light_04');
	
	//Pause Clock Check Box
	this.gui.add(this.scene, 'pauseClock');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'acceleration', -2, 2);

	this.submarine = this.scene.getSubmarine();

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{

	};
};

MyInterface.prototype.processKeyDown = function(event) {
	console.log("KEY DOWN");
	
	switch (event.keyCode)
	{
		case (65):	// A
		case (97):
			this.submarine.rotatingLeft();
			break;

		case (68):	// D
		case (100):
			this.submarine.rotatingRight();
			break;

		case (69):	// E
		case (101):
			this.submarine.movingDownwards();
			break;

		case (81):	// Q
		case (113):
			this.submarine.movingUpwards();
			break;

		case (87):	// W
		case (119):
			this.submarine.movingForward();
			break;
		
		case (83):	// S
		case (115):
			this.submarine.movingBackward();
			break;

		case (80):	// P
		case (112):
			this.submarine.raisePeriscope();
			break;

		case (76):
		case (108):
			this.submarine.lowerPeriscope();
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {	

	console.log("KEY UP");

	switch (event.keyCode)
	{
		case (65):	//A
		case (97):
		case (68):	//D
		case (100):
			this.submarine.dampenAngVel();
			break;

		case (69):	// E
		case (101):
		case (81):	// Q
		case (113):
			this.submarine.dampenVerticalVel();
			break;

		case (87):	//W
		case (119):
		case (83):	//S
		case (115):
			// Should maintain speed - Uncomment to simulate friction
			//this.submarine.dampenVel();
			break;
			
	};
};