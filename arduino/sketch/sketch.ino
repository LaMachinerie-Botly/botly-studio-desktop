#include <Scott.h>

Scott robot(ORIGINAL);

void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  for (int count = 0; count < 5; count++) {
    robot.avancer(10);
  }

}