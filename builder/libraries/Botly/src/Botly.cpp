#include <Arduino.h>
#include "Botly.h"


Botly::Botly(){
	Botly(SCOTT_V4);
}

Botly::Botly(int version){
	Steppers = new BotlySteppers(version);
	_version = version;
}

void Botly::init()
{
	tpsTop = millis();
	if(_version == SCOTT_V4)
	{
		crayon.attach(_pinScottServo);
		crayon.write(_scottHaut);

		pinMode(_pinSwitchDroite, INPUT);
	  pinMode(_pinSwitchGauche, INPUT);

	  pinMode(_pinLigneDroite, INPUT);
	  pinMode(_pinLigneGauche, INPUT);

	  pinMode(_pinLumiereDroite, INPUT);
	  pinMode(_pinLumiereGauche, INPUT);

	  pinMode(_pinDistDroite, INPUT);
	  pinMode(_pinDistGauche, INPUT);

	  pinMode(_pinScottIrEmetteur, OUTPUT);
	}
	else
	{
		analogReference(INTERNAL); //reference analogique 2.56V

		crayon.attach(_pinBotlyServo);
		crayon.write(_botlyHaut);

		pinMode(_pinBotlyIrEmetteur, OUTPUT);
	}


	Steppers->setMaxSpeed(900.0);
	Steppers->setSpeed(300.0);
	Steppers->enable();
}

void Botly::run(){
  Steppers->run();
}


void Botly::setSpeed(float vitesse){
	Steppers->setSpeed(vitesse);
}

void Botly::setSpeed( float vitesseD, float vitesseG){
	Steppers->setSpeed(vitesseD, vitesseG);
}

void Botly::logSpeed(){
	Serial.print("Vitesse : "); Serial.print(Steppers->getSpeed(0)); Serial.print(" | "); Serial.println(Steppers->getSpeed(1));
	Serial.print("Vitesse max : "); Serial.print(Steppers->getMaxSpeed(0)); Serial.print(" | "); Serial.println(Steppers->getMaxSpeed(1));
}


void Botly::turnGoDegree(float angle, int ligne){
  angle = angle * DEG_TO_RAD ; // Passage en radians
  turnGo(angle, ligne);
}

void Botly::turnGo(float angle, int ligne){

  if(angle > 0 && angle < PI){
    gauche( int( (angle * RAD_TO_STEP)) );
  }
  else if( angle >= PI ){
	  droite(int( ( (angle-PI) * RAD_TO_STEP)) );
  }
  else if( angle < 0 ){
    droite(int( -( angle * RAD_TO_STEP)) );
  }
  else{
    stop(100);
  }

  if( ligne > 0 ){
    avant( ligne * MM_TO_STEP );
  }
  else if( ligne < 0 ){
    arriere( -( ligne * MM_TO_STEP) );
  }
  else{
    stop(100);
  }
}


void Botly::avant(long pas){
	Steppers->moveTo(-pas, pas);
	Steppers->runSpeedToPosition(); //Blockling...
	Steppers->setPositions();
}

void Botly::arriere(long pas){
	Steppers->moveTo(pas, -pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();
}

void Botly::gauche(long pas){
	Steppers->moveTo(-pas, -pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();

}

void Botly::droite(long pas){
	Steppers->moveTo(pas, pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();
}


//Battery Power save !!!!
void Botly::stop(long temps){
	if(temps > 40){
		delay(20);
		Steppers->disable();
		delay(temps-40);
		Steppers->enable();
		delay(20);
	}else{
		delay(temps);
	}
}

//Battery Power save !!!!
void Botly::stop(){
	Steppers->disable();
}

void Botly::tournerGauche(long angleDegree){
	gauche(long((angleDegree * DEG_TO_RAD * RAD_TO_STEP)));
}

void Botly::tournerDroite(long angleDegree){
	droite(long((angleDegree * DEG_TO_RAD *RAD_TO_STEP)));
}

void Botly::avancer(long distanceMillimeter){
	turnGoDegree(0, distanceMillimeter);
}

void Botly::reculer(long distanceMillimeter){
	turnGoDegree(0, -distanceMillimeter);
}

void Botly::polygone(unsigned int nbrCote, unsigned int longueur){
	if (nbrCote >=3)
	{
		float polyAngle = 360 / nbrCote;
		turnGoDegree(0,longueur);
		for (unsigned int i=1 ; i<nbrCote ; i++)
		{
			turnGoDegree(polyAngle,longueur);
		}
		turnGoDegree(polyAngle,0);
	}
}

void Botly::rectangle(unsigned int largeur, unsigned int longueur){
	turnGoDegree(0,largeur);
	turnGoDegree(90,longueur);
	turnGoDegree(90,largeur);
	turnGoDegree(90,longueur);
	turnGoDegree(90,0);
}

void Botly::carre(unsigned int longueur){
	rectangle(longueur,longueur);
}

void Botly::cercle(unsigned int diametre){
	float angleCercle = 11 * DEG_TO_RAD ; // Passage en radians
	unsigned int corde = (diametre * angleCercle )/2 ;
	polygone(32,corde * 1.25); // 33=arrondi de 360/11
}

void Botly::arc( float rayon,float angle){
	int pasD, pasG;
	if(angle > 0){
		pasD = ((rayon - DELTA_ARC) * angle*DEG_TO_RAD) * MM_TO_STEP;
		pasG = ((rayon + DELTA_ARC) * angle*DEG_TO_RAD) * MM_TO_STEP;
	}else{
		pasG = ((rayon - DELTA_ARC) * angle*DEG_TO_RAD) * MM_TO_STEP;
		pasD = ((rayon + DELTA_ARC) * angle*DEG_TO_RAD) * MM_TO_STEP;
	}
	Steppers->moveTo(pasD, pasG);
}

void Botly::leverCrayon(){
	if(_version == SCOTT_V4)
	{
		crayon.write(_scottHaut);
	}
	else
	{
		crayon.write(_botlyHaut);
	}

}

void Botly::poserCrayon(){
	if(_version == SCOTT_V4)
	{
		crayon.write(_scottBas);
	}
	else
	{
		crayon.write(_botlyBas);
	}
}

void Botly::bougerCrayon(int angle)
{
	crayon.write(angle);
}

//--------------------------------------------
// Fonctions pour la version BOTLY V1 du robot
//--------------------------------------------

void Botly::isIRDataReceived()
{
	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version

	if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    irrecv.resume(); // Receive the next value
    }
}

void Botly::initIRcom()
{
	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version

	irrecv.enableIRIn(); // Start the receiver
}

void Botly::sonyCode(byte data)
{
	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version

	irsend.sendSony(data, 8);
}

bool Botly::proximite()
{
	if (_version==SCOTT_V4) return 0; // annule la fonction si mauvaise version

	for(int i = 0; i <= 384; i++) { //envoie une trame
		digitalWrite(_pinBotlyIrEmetteur, HIGH);
		delayMicroseconds(13);
		digitalWrite(_pinBotlyIrEmetteur, LOW);
		delayMicroseconds(13);
	}

	if(digitalRead(_pinTsop)==LOW) { //on regarde si le tsop détecte la trame
      return 1;
    }

    else {
      return 0;
    }
}

/*Cette fonction mesure la valeur analogique
La référence interne est de 2.56V peu importe la tension
d'alimentation du controleur
Mesure sur 1024 valeurs (10bits)
Méthode de recalcul: (2.56/1024)*mesureAnalogique
Ne pas oublier le rapport de transformation du pont diviseur
en hardware
*/
int Botly::mesureBatterie()
{
  if (_version==SCOTT_V4) return 0; // annule la fonction si mauvaise version

	int mesureAnalogique=analogRead(_pinMesureBatterie);
	return mesureAnalogique;
}

void Botly::sleepNow()
{
	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version
	/* In the Atmega32u4 datasheet on page 62
	 * there is a list of sleep modes which explains which clocks and
	 * wake up sources are available for each sleep mode.
	 *
	 * In the avr/sleep.h file, the call names of these sleep modus are to be found:
	 *
	 * The 5 different modes are:
	 * SLEEP_MODE_IDLE -the least power savings, wake up on usart
	 * SLEEP_MODE_ADC
	 * SLEEP_MODE_PWR_SAVE
	 * SLEEP_MODE_STANDBY
	 * SLEEP_MODE_PWR_DOWN -the most power savings
	 */
	set_sleep_mode(SLEEP_MODE_PWR_DOWN); // sleep mode is set here
	sleep_enable(); // enables the sleep in mcucr register,safety bit
	power_all_disable(); //low power consumption
	sleep_mode(); // here the device is actually put to sleep!!
	// THE PROGRAM CONTINUES FROM HERE AFTER WAKING UP
	sleep_disable(); //disable sleep, safety bit
	power_all_enable(); //restore power on peripherals
}

void Botly::sleepWakeup()
{
	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version
	/* In the Atmega32u4 datasheet on page 62
	 * there is a list of sleep modes which explains which clocks and
	 * wake up sources are available for each sleep mode.
	 *
	 * In the avr/sleep.h file, the call names of these sleep modus are to be found:
	 *
	 * The 5 different modes are:
	 * SLEEP_MODE_IDLE -the least power savings, wake up on usart
	 * SLEEP_MODE_ADC
	 * SLEEP_MODE_PWR_SAVE
	 * SLEEP_MODE_STANDBY
	 * SLEEP_MODE_PWR_DOWN -the most power savings
	 */

	attachInterrupt(0, pin2_isr,LOW );//wake up on interrupt pin 2 or 3
	set_sleep_mode(SLEEP_MODE_PWR_DOWN); // sleep mode
	cli(); //clear interrupts
	sleep_enable(); // enables sleep bit in mcucr register, safety pin
	sei();//to allow wake up by interrupt
	//power_adc_disable();
	//power_usart0_disable();
	//power_spi_disable();
	//power_twi_disable();
	//power_timer0_disable();
	//power_timer1_disable();
	//power_timer2_disable();
	//power_timer3_disable();
	//power_usart1_disable();
	//power_usb_disable();

	power_all_disable(); //low power consumption
	sleep_mode(); // here the device is actually put to sleep!!
	// THE PROGRAM CONTINUES FROM HERE AFTER WAKING UP
	sleep_disable(); //disable sleep,safety bit
	power_all_enable(); //restore power on peripherals
}


// !!!! Pas utilisé pour le moment
//external interrupt routine to wake up controller
// void pin2_isr()
// {
// 	if (_version==SCOTT_V4) return; // annule la fonction si mauvaise version
//   sleep_disable();
//   detachInterrupt(0);
// }


//--------------------------------------------
// Fonctions pour la version SCOTT V4 du robot
//--------------------------------------------


unsigned char Botly::lectureContact()
{
	if (_version==BOTLY_V1) return 0; // annule la fonction si mauvaise version
	return (!digitalRead(_pinSwitchDroite) + 2*(!digitalRead(_pinSwitchGauche)));
	//  Gauche  |  Droit  ||  Resultat
	//----------|---------||----------
	//    0     +    0    ||     0
	//    0     +    1    ||     1
	// 2 (2*1)  +    0    ||     2
	// 2 (2*1)  +    1    ||     3
}

unsigned int Botly::lectureLumiere()
{
	if (_version==BOTLY_V1) return 0; // annule la fonction si mauvaise version
	delayMicroseconds(180);

	unsigned int _LumiereDroite = analogRead(_pinLumiereDroite);
	unsigned int _LumiereGauche = analogRead(_pinLumiereGauche);

	return (_LumiereDroite*100)/(_LumiereGauche + _LumiereDroite);

}

unsigned int Botly::lectureDistance()
{
	if (_version==BOTLY_V1) return 0; // annule la fonction si mauvaise version
	digitalWrite(_pinScottIrEmetteur,HIGH);
	delayMicroseconds(180);

	_distDroite = analogRead(_pinDistDroite);
	_distGauche = analogRead(_pinDistGauche);

	digitalWrite(_pinScottIrEmetteur,LOW);
	delayMicroseconds(180);
	_distDroite -= analogRead(_pinDistDroite);
	_distGauche -= analogRead(_pinDistGauche);

	return (_distDroite*100)/(_distGauche + _distDroite);
}

unsigned int Botly::lectureLigne()
{
	if (_version==BOTLY_V1) return 0; // annule la fonction si mauvaise version
	digitalWrite(_pinScottIrEmetteur,HIGH);
	delayMicroseconds(180);
	unsigned int _irDroit = analogRead(_pinLigneDroite);
	unsigned int _irGauche = analogRead(_pinLigneGauche);

	digitalWrite(_pinScottIrEmetteur,LOW);
	delayMicroseconds(180);
	_irDroit -= analogRead(_pinLigneDroite);
	_irGauche -= analogRead(_pinLigneGauche);

	return (_irDroit*100)/(_irGauche + _irDroit);
}
