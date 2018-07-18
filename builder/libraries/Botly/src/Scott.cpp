#include <Arduino.h>
#include "Scott.h"


Scott::Scott(){
	Scott(DEFAULT);
}

Scott::Scott(int version){
	Steppers = new ScottSteppers();
}

void Scott::init()
{	
	analogReference(INTERNAL); //reference analogique 2.56V
	
	tpsTop = millis();
	crayon.attach(_pinServo);
	crayon.write(_haut);
   
	Steppers->setMaxSpeed(900.0);
	Steppers->setSpeed(300.0);
	Steppers->enable();
}

void Scott::run(){
  Steppers->run();
}


void Scott::setSpeed(float vitesse){
	Steppers->setSpeed(vitesse);
}

void Scott::setSpeed( float vitesseD, float vitesseG){
	Steppers->setSpeed(vitesseD, vitesseG);
}

void Scott::logSpeed(){
	Serial.print("Vitesse : "); Serial.print(Steppers->getSpeed(0)); Serial.print(" | "); Serial.println(Steppers->getSpeed(1));
	Serial.print("Vitesse max : "); Serial.print(Steppers->getMaxSpeed(0)); Serial.print(" | "); Serial.println(Steppers->getMaxSpeed(1));
}


void Scott::turnGoDegree(float angle, int ligne){
  angle = angle * DEG_TO_RAD ; // Passage en radians
  turnGo(angle, ligne);
}

void Scott::turnGo(float angle, int ligne){

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


void Scott::avant(long pas){
	Steppers->moveTo(-pas, pas);
	Steppers->runSpeedToPosition(); //Blockling...
	Steppers->setPositions();
}

void Scott::arriere(long pas){
	Steppers->moveTo(pas, -pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();
}

void Scott::gauche(long pas){
	Steppers->moveTo(-pas, -pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();
	
}

void Scott::droite(long pas){
	Steppers->moveTo(pas, pas);
	Steppers->runSpeedToPosition();//Blockling...
	Steppers->setPositions();
}


//Battery Power save !!!!
void Scott::stop(long temps){
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
void Scott::stop(){
	Steppers->disable();
}


void Scott::tournerGauche(long angleDegree){
	gauche(long((angleDegree * DEG_TO_RAD * RAD_TO_STEP)));
}

void Scott::tournerDroite(long angleDegree){
	droite(long((angleDegree * DEG_TO_RAD *RAD_TO_STEP)));
}

void Scott::avancer(long distanceMillimeter){
	turnGoDegree(0, distanceMillimeter);
}

void Scott::reculer(long distanceMillimeter){
	turnGoDegree(0, -distanceMillimeter);
}

void Scott::polygone(unsigned int nbrCote, unsigned int longueur){
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

void Scott::rectangle(unsigned int largeur, unsigned int longueur){
	turnGoDegree(0,largeur);
	turnGoDegree(90,longueur);
	turnGoDegree(90,largeur);
	turnGoDegree(90,longueur);
	turnGoDegree(90,0);
}

void Scott::carre(unsigned int longueur){
	rectangle(longueur,longueur);
}

void Scott::cercle(unsigned int diametre){
	float angleCercle = 11 * DEG_TO_RAD ; // Passage en radians
	unsigned int corde = (diametre * angleCercle )/2 ;
	polygone(32,corde * 1.25); // 33=arrondi de 360/11
}

void Scott::arc( float rayon,float angle){
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




void Scott::leverCrayon(){
	crayon.write(_haut);
}

void Scott::poserCrayon(){
	crayon.write(_bas);
}

void Scott::bougerCrayon(int angle){
	crayon.write(angle);
}







void Scott::isIRDataReceived() {
	if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    irrecv.resume(); // Receive the next value
    }
}

void Scott::initIRcom() {
	irrecv.enableIRIn(); // Start the receiver
}

void Scott::sonyCode(byte data) {
	irsend.sendSony(data, 8);
}

bool Scott::proximite() {
	for(int i = 0; i <= 384; i++) { //envoie une trame
		digitalWrite(_pinIrEmetteur, HIGH);
		delayMicroseconds(13);
		digitalWrite(_pinIrEmetteur, LOW);
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
int Scott::mesureBatterie()
{
	
	int mesureAnalogique=analogRead(_pinMesureBatterie);
	return mesureAnalogique;
}

void Scott::sleepNow()
{
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

void Scott::sleepWakeup()
{
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

//class extern
//external interrupt routine to wake up controller
void pin2_isr()
{
  sleep_disable();
  detachInterrupt(0);
}