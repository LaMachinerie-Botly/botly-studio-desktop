#include "ScottSteppers.h"

/*****************************************************
 *      	    Méthodes et Constructeur             *
 *                   ScottSteppers                   *
 *                                                   *
 *****************************************************/



ScottSteppers::ScottSteppers(){

	SStepper droite(DroitB2, DroitA2, DroitB1, DroitA1);
	SStepper gauche(GaucheB2, GaucheA2, GaucheB1, GaucheA1);
	
	_stepperD = droite;
	_stepperG = gauche;
}


bool ScottSteppers::run(){
	uint8_t i;
    bool ret = false;

	if ( _stepperD.distanceToGo() != 0)
	{
		_stepperD.runSpeed();
		ret = true;
	}
	if ( _stepperG.distanceToGo() != 0)
	{
		_stepperG.runSpeed();
		ret = true;
	}

    return ret;
}


void ScottSteppers::runSpeedToPosition()
{ 
    while (run())
	;
}

void ScottSteppers::setPositions(){
	_stepperD.setCurrentPosition(0);
	_stepperG.setCurrentPosition(0);
}

void ScottSteppers::moveTo(long absoluteD, long absoluteG){
	// First find the stepper that will take the longest time to move
    float longestTime = 0.0;
	
    uint8_t i;

	long thisDistance = absoluteD - _stepperD.currentPosition();
	float thisTime = abs(thisDistance) / _stepperD.maxSpeed();

	if (thisTime > longestTime)
	    longestTime = thisTime;
	
	
	thisDistance = absoluteG - _stepperG.currentPosition();
	thisTime = abs(thisDistance) / _stepperG.maxSpeed();

	if (thisTime > longestTime)
	    longestTime = thisTime;


    if (longestTime > 0.0)
    {
	// Now work out a new max speed for each stepper so they will all 
	// arrived at the same time of longestTime
	
	thisDistance = absoluteD - _stepperD.currentPosition();
	float thisSpeed = thisDistance / longestTime;
	_stepperD.moveTo(absoluteD); // New target position (resets speed)
	_stepperD.setSpeed(thisSpeed); // New speed
	
	thisDistance = absoluteG - _stepperG.currentPosition();
	thisSpeed = thisDistance / longestTime;
	_stepperG.moveTo(absoluteG); // New target position (resets speed)
	_stepperG.setSpeed(thisSpeed); // New speed
			
	}
}

void ScottSteppers::move(long relativeD, long relativeG){
	//float thisSpeed = _stepperD.maxSpeed();
	_stepperD.move(relativeD); // New target position (resets speed)
	//_stepperD.setSpeed(thisSpeed); // New speed
	
	//thisSpeed = _stepperG.maxSpeed();
	_stepperG.move(relativeG); // New target position (resets speed)
	//_stepperG.setSpeed(thisSpeed); // New speed
}
	
float ScottSteppers::getMaxSpeed(int i){
	if(i == 1) return _stepperD.maxSpeed();
	if(i == 2) return _stepperG.maxSpeed();
	return 0;
}

float ScottSteppers::getSpeed(int i){
	if(i == 1) return _stepperD.speed();
	if(i == 2) return _stepperG.speed();
	return 0;
}	
	
	
void ScottSteppers::setMaxSpeed(float vitesse){
	setMaxSpeed(vitesse, vitesse);
}
	
void ScottSteppers::setSpeed(float vitesse){
	setSpeed(vitesse, vitesse);
}

void ScottSteppers::setMaxSpeed(float vitesseDroite, float vitesseGauche){
	_stepperD.setMaxSpeed(vitesseDroite);
	_stepperG.setMaxSpeed(vitesseGauche);
}
	
void ScottSteppers::setSpeed(float vitesseDroite, float vitesseGauche){
	_stepperD.setSpeed(vitesseDroite);
	_stepperG.setSpeed(vitesseGauche);
}


void ScottSteppers::disable(){
	_stepperD.disableOutputs();
	_stepperG.disableOutputs();
}

void ScottSteppers::enable(){
	_stepperD.enableOutputs();
	_stepperG.enableOutputs();
}





//Fin de la class ScottSteppers





/*****************************************************
 *      	    Méthodes et Constructeur             *
 *                     SSteppers                     *
 *                                                   *
 *****************************************************/

 void SStepper::moveTo(long absolute)
{
    if (_targetPos != absolute)
    {
	_targetPos = absolute;
	computeNewSpeed();
	// compute new n?
    }
}

void SStepper::move(long relative)
{
    moveTo(_currentPos + relative);
}

// Implements steps according to the current step interval
// You must call this at least once per step
// returns true if a step occurred
bool SStepper::runSpeed()
{
    // Dont do anything unless we actually have a step interval
    if (!_stepInterval)
	return false;

    unsigned long time = micros();   
    if (time - _lastStepTime >= _stepInterval){
		if (_direction == DIRECTION_CW){
			// Clockwise
			_currentPos += 1;
		}
		else{
			// Anticlockwise  
			_currentPos -= 1;
		}
		step(_currentPos);

		_lastStepTime = time; // Caution: does not account for costs in step()

		return true;
    }
    else{
		return false;
    }
}

long SStepper::distanceToGo()
{
    return _targetPos - _currentPos;
}

long SStepper::targetPosition()
{
    return _targetPos;
}

long SStepper::currentPosition()
{
    return _currentPos;
}

// Useful during initialisations or after initial positioning
// Sets speed to 0
void SStepper::setCurrentPosition(long position)
{
    _targetPos = _currentPos = position;
    _n = 0;
    _stepInterval = 0;
    _speed = 0.0;
}

void SStepper::computeNewSpeed()
{
    long distanceTo = distanceToGo(); // +ve is clockwise from curent location

    long stepsToStop = (long)((_speed * _speed) / (2.0 * _acceleration)); // Equation 16

    if (distanceTo == 0 && stepsToStop <= 1)
    {
	// We are at the target and its time to stop
	_stepInterval = 0;
	_speed = 0.0;
	_n = 0;
	return;
    }

    if (distanceTo > 0)
    {
	// We are anticlockwise from the target
	// Need to go clockwise from here, maybe decelerate now
	if (_n > 0)
	{
	    // Currently accelerating, need to decel now? Or maybe going the wrong way?
	    if ((stepsToStop >= distanceTo) || _direction == DIRECTION_CCW)
		_n = -stepsToStop; // Start deceleration
	}
	else if (_n < 0)
	{
	    // Currently decelerating, need to accel again?
	    if ((stepsToStop < distanceTo) && _direction == DIRECTION_CW)
		_n = -_n; // Start accceleration
	}
    }
    else if (distanceTo < 0)
    {
	// We are clockwise from the target
	// Need to go anticlockwise from here, maybe decelerate
	if (_n > 0)
	{
	    // Currently accelerating, need to decel now? Or maybe going the wrong way?
	    if ((stepsToStop >= -distanceTo) || _direction == DIRECTION_CW)
		_n = -stepsToStop; // Start deceleration
	}
	else if (_n < 0)
	{
	    // Currently decelerating, need to accel again?
	    if ((stepsToStop < -distanceTo) && _direction == DIRECTION_CCW)
		_n = -_n; // Start accceleration
	}
    }

    // Need to accelerate or decelerate
    if (_n == 0)
    {
	// First step from stopped
	_cn = _c0;
	_direction = (distanceTo > 0) ? DIRECTION_CW : DIRECTION_CCW;
    }
    else
    {
	// Subsequent step. Works for accel (n is +_ve) and decel (n is -ve).
	_cn = _cn - ((2.0 * _cn) / ((4.0 * _n) + 1)); // Equation 13
	_cn = max(_cn, _cmin); 
    }
    _n++;
    _stepInterval = _cn;
    _speed = 1000000.0 / _cn;
    if (_direction == DIRECTION_CCW)
	_speed = -_speed;

}

// Run the motor to implement speed and acceleration in order to proceed to the target position
// You must call this at least once per step, preferably in your main loop
// If the motor is in the desired position, the cost is very small
// returns true if the motor is still running to the target position.
bool SStepper::run()
{
    if (runSpeed())
	computeNewSpeed();
    return _speed != 0.0 || distanceToGo() != 0;
}


SStepper::SStepper( uint8_t pin1, uint8_t pin2, uint8_t pin3, uint8_t pin4)
{
    _currentPos = 0;
    _targetPos = 0;
    _speed = 0.0;
    _maxSpeed = 1000.0;
    _acceleration = 0.0;
    _sqrt_twoa = 1.0;
    _stepInterval = 0;
    _minPulseWidth = 1;
    _enablePin = 0xff;
    _lastStepTime = 0;
    _pin[0] = pin1;
    _pin[1] = pin2;
    _pin[2] = pin3;
    _pin[3] = pin4;

    // NEW
    _n = 0;
    _c0 = 0.0;
    _cn = 0.0;
    _cmin = 1.0;
    _direction = DIRECTION_CCW;

    int i;
    for (i = 0; i < 4; i++)
	_pinInverted[i] = 0;
	enableOutputs();
}


void SStepper::setMaxSpeed(float speed)
{
    if (speed < 0.0)
       speed = -speed;
    if (_maxSpeed != speed)
    {
	_maxSpeed = speed;
	_cmin = 1000000.0 / speed;
	// Recompute _n from current speed and adjust speed if accelerating or cruising
	if (_n > 0)
	{
	    _n = (long)((_speed * _speed) / (2.0 * _acceleration)); // Equation 16
	    computeNewSpeed();
	}
    }
}

float   SStepper::maxSpeed()
{
    return _maxSpeed;
}

void SStepper::setSpeed(float speed)
{
    if (speed == _speed)
        return;
    speed = constrain(speed, -_maxSpeed, _maxSpeed);
    if (speed == 0.0)
	_stepInterval = 0;
    else{
		_stepInterval = fabs(1000000.0 / speed);
		_direction = (speed > 0.0) ? DIRECTION_CW : DIRECTION_CCW;
    }
    _speed = speed;
}

float SStepper::speed()
{
    return _speed;
}

void SStepper::step(long step)
{
	switch (step & 0x7)
    {
	case 0:    // 1000
	    setOutputPins(0b0001);
            break;
	    
        case 1:    // 1010
	    setOutputPins(0b0101);
            break;
	    
	case 2:    // 0010
	    setOutputPins(0b0100);
            break;
	    
        case 3:    // 0110
	    setOutputPins(0b0110);
            break;
	    
	case 4:    // 0100
	    setOutputPins(0b0010);
            break;
	    
        case 5:    //0101
	    setOutputPins(0b1010);
            break;
	    
	case 6:    // 0001
	    setOutputPins(0b1000);
            break;
	    
        case 7:    //1001
	    setOutputPins(0b1001);
            break;
    }
}

// You might want to override this to implement eg serial output
// bit 0 of the mask corresponds to _pin[0]
// bit 1 of the mask corresponds to _pin[1]
// ....
void SStepper::setOutputPins(uint8_t mask)
{
    uint8_t numpins = 4;
    uint8_t i;
    for (i = 0; i < numpins; i++)
	digitalWrite(_pin[i], (mask & (1 << i)) ? (HIGH ^ _pinInverted[i]) : (LOW ^ _pinInverted[i]));
}



    
// Prevents power consumption on the outputs
void    SStepper::disableOutputs()
{   
    setOutputPins(0); // Handles inversion automatically
    if (_enablePin != 0xff)
    {
        pinMode(_enablePin, OUTPUT);
        digitalWrite(_enablePin, LOW ^ _enableInverted);
    }
}

void    SStepper::enableOutputs()
{
    pinMode(_pin[0], OUTPUT);
    pinMode(_pin[1], OUTPUT);
    pinMode(_pin[2], OUTPUT);
    pinMode(_pin[3], OUTPUT);


    if (_enablePin != 0xff)
    {
        pinMode(_enablePin, OUTPUT);
        digitalWrite(_enablePin, HIGH ^ _enableInverted);
    }
}

void SStepper::setMinPulseWidth(unsigned int minWidth)
{
    _minPulseWidth = minWidth;
}

void SStepper::setEnablePin(uint8_t enablePin)
{
    _enablePin = enablePin;

    // This happens after construction, so init pin now.
    if (_enablePin != 0xff)
    {
        pinMode(_enablePin, OUTPUT);
        digitalWrite(_enablePin, HIGH ^ _enableInverted);
    }
}

void SStepper::setPinsInverted(bool directionInvert, bool stepInvert, bool enableInvert)
{
    _pinInverted[0] = stepInvert;
    _pinInverted[1] = directionInvert;
    _enableInverted = enableInvert;
}

void SStepper::setPinsInverted(bool pin1Invert, bool pin2Invert, bool pin3Invert, bool pin4Invert, bool enableInvert)
{    
    _pinInverted[0] = pin1Invert;
    _pinInverted[1] = pin2Invert;
    _pinInverted[2] = pin3Invert;
    _pinInverted[3] = pin4Invert;
    _enableInverted = enableInvert;
}

// Blocks until the target position is reached and stopped
void SStepper::runToPosition()
{
    while (run())
	;
}

bool SStepper::runSpeedToPosition()
{
    if (_targetPos == _currentPos)
	return false;
    if (_targetPos >_currentPos)
	_direction = DIRECTION_CW;
    else
	_direction = DIRECTION_CCW;
    return runSpeed();
}

// Blocks until the new target position is reached
void SStepper::runToNewPosition(long position)
{
    moveTo(position);
    runToPosition();
}

void SStepper::stop()
{
    if (_speed != 0.0)
    {    
		long stepsToStop = (long)((_speed * _speed) / (2.0 * _acceleration)) + 1; // Equation 16 (+integer rounding)
		if (_speed > 0)
			move(stepsToStop);
		else
			move(-stepsToStop);
    }
}

bool SStepper::isRunning()
{
    return !(_speed == 0.0 && _targetPos == _currentPos);
}

 

 
 
 
 
 //Fin de la class SStepper
 
 
