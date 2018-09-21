# 1 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
# 1 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino"
# 2 "C:\\Users\\jtopart\\Documents\\GitHub\\Releases\\BotlyStudio\\resources\\app\\builder\\sketch\\sketch.ino" 2

Botly robot(1 /* Version de base de Botly*/);

void setup() {
  robot.setSpeed(35);
  robot.init();
}

void loop() {
  robot.avancer(10);
  robot.tournerGauche(90);

}
