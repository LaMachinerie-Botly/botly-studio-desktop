#include <Botly.h>

int _C3_A9l_C3_A9ment;

Botly robot(SCOTT_V4);

void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  _C3_A9l_C3_A9ment = 5;
  for (int count = 0; count < 60; count++) {
    robot.avancer(_C3_A9l_C3_A9ment);
    robot.tournerGauche(120);
    _C3_A9l_C3_A9ment = _C3_A9l_C3_A9ment + 5;
  }

}