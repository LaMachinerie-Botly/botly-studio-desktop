#include <Botly.h>

Botly robot(SCOTT_V4);

void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  robot.avancer(10);
  robot.tournerGauche(90);

}