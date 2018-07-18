#include <Scott.h>

Scott robot(ORIGINAL);

void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  robot.avancer(10);

}