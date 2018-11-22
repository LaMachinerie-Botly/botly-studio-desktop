# 1 "C:\\Users\\jules\\Documents\\GitHub\\BotlyStudio-App\\builder\\sketch\\sketch.ino"
# 1 "C:\\Users\\jules\\Documents\\GitHub\\BotlyStudio-App\\builder\\sketch\\sketch.ino"
# 2 "C:\\Users\\jules\\Documents\\GitHub\\BotlyStudio-App\\builder\\sketch\\sketch.ino" 2

int _C3_A9l_C3_A9ment;

Botly robot(1 /* Version de base de Botly*/);

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
