#include <Arduino.h>
#line 1 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
#line 1 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
#include <Botly.h>

Botly robot(SCOTT_V4);

#line 5 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
void setup();
#line 10 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
void loop();
#line 5 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  robot.avancer(10);
  robot.tournerGauche(90);

}
