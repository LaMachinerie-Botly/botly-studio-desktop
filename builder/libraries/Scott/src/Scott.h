/*
.--.       .  .           .--.      .          .
|   )     _|_ |           |   )     |         _|_
|--:  .-.  |  | .  . ____ |--'  .-. |.-.  .-.  |
|   )(   ) |  | |  |      |  \ (   )|   )(   ) |
'--'  `-'  `-'`-`--|      '   ` `-' '`-'  `-'  `-'
                   ;
                `-'
* [foo description]
* Librairie principale des robots Botly et Scott
* @date         2018-11-22
* @author       Jules T. / Adrien B. / Alexandre P.
* @entreprise   La Machinerie
* @version      V2.0.3
*/

#ifndef Botly_h
#define Botly_h
#define LIBRARY_VERSION	2.0.3

/*********************************
     Constantes de calibrations
 *********************************/

#define SCOTT_MM_TO_STEP 260.76
#define SCOTT_RAD_TO_STEP 1210
#define SCOTT_DELTA_ARC 47.5


/*********************
	 Dependances
*********************/
#include <Servo.h>
#include <Arduino.h>

#include "ScottSteppers.h"

void pin2_isr();

class Scott{
public:

  Servo crayon;

  Scott();

  Scott(int version);

  void init();

  void setCalibration(int distance, int rotation);

  void run();

  void stop(long temps);

  void stop();

  void gauche(long pas);

  void tournerGauche(long angleDegree);

  void droite(long pas);

  void tournerDroite(long angleDegree);

  void avant(long pas);

  void avancer(long distanceMillimeter);

  void arriere(long pas);

  void reculer(long distanceMillimeter);

  void setSpeed(float vitesse);

  void setSpeed(float vitesseD, float vitesseG);

  void logSpeed();

  void turnGo(float angle, long ligne);

  void turnGoDegree(float angle, long ligne);

  void polygone(unsigned int nbrCote, unsigned int longueur);

  void rectangle(unsigned int largeur, unsigned int longueur);

  void carre(unsigned int longueur);

  void cercle(unsigned int diametre);

  void arc(float rayon,float angle);

  void leverCrayon();

  void poserCrayon();

  void bougerCrayon(int angle);

  // ----------------------------
  // Fonctions dédiées à ScottV4
  // ----------------------------

  unsigned int lectureDistance();

  unsigned int lectureLigne();

  unsigned int lectureLumiere();

  unsigned char lectureContact();

private:

  int _pinScottServo= 3   ; // Pin servo pour ScottV4

  // Définition des pins à partir de la version ScottV4
  int _pinSwitchDroite = 4 ;
  int _pinSwitchGauche = 5 ;
  int _pinLigneDroite = A1 ;
  int _pinLigneGauche = A0 ;
  int _pinLumiereDroite = A7 ;
  int _pinLumiereGauche = A6 ;
  int _pinDistDroite = A2 ;
  int _pinDistGauche = A3 ;
  int _pinScottIrEmetteur = 2 ;

  ScottSteppers *Steppers;
  // Variable capteur de distance
  int _distDroite;
  int _distGauche;

  // Variable Crayon

  // Version Scott
  int _scottBas = -35; // A modifier
  int _scottHaut = 10;

  // Variables de calibration des deplacements
  int _mmToStep = 0;
  int _radToStep = 0;
  int _deltaArc = 0;

  int servoAction = 0;

};
#endif
