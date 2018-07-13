
'use strict';

goog.provide('Blockly.Arduino.scott');
goog.require('Blockly.Arduino');

//Arduino Scott block generator


Blockly.Arduino['scott_forward'] = function(block) {
  var forward_distance = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.avancer('+ forward_distance +');\n';
  return code;
};

Blockly.Arduino['scott_backward'] = function(block) {
  var backward_distance = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.reculer('+ backward_distance +');\n';
  return code;
};

Blockly.Arduino['scott_right'] = function(block) {
  var right_angle = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.tournerDroite('+ right_angle +');\n';
  return code;
};

Blockly.Arduino['scott_left'] = function(block) {
  var left_angle = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.tournerGauche('+ left_angle +');\n';
  return code;
};

/*
Blockly.Arduino['scott_stop'] = function(block) {
  var stop_time = block.getFieldValue('time');

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.stop('+ stop_time +');\n';
  return code;
};
*/

Blockly.Arduino['scott_turn_go'] = function(block) {
  var turn_go_angle = block.getFieldValue('angle');
  var turn_go_distance = block.getFieldValue('distance');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.turnGoDegree('+ turn_go_angle +','+ turn_go_distance +');\n';
  return code;
};

Blockly.Arduino['scott_polygone'] = function(block) {
  var number_nbr_cote = block.getFieldValue('nbr_cote');
  var number_taille = block.getFieldValue('taille');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.polygone('+ number_nbr_cote +','+ number_taille +');\n';
  return code;
};

Blockly.Arduino['scott_cercle'] = function(block) {
  var cercle_diametre = block.getFieldValue('diametre');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.cercle('+ cercle_diametre +');\n';
  return code;
};

Blockly.Arduino['scott_ligne'] = function(block) {
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.lectureLigne()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['scott_contact'] = function(block) {
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.lectureContact()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/*
Blockly.Arduino['scott_lever_crayon'] = function(block) {
	//-------------------------------------------------------------------
    Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
    Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

    var setupCode = 'robot.setSpeed(35);\n robot.init();';
    Blockly.Arduino.addSetup('Scott', setupCode, true);
    //-------------------------------------------------------------------
  var code = 'robot.leverCrayon();\n';
  return code;
};

Blockly.Arduino['scott_descendre_crayon'] = function(block) {
	//-------------------------------------------------------------------
    Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
    Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

    var setupCode = 'robot.setSpeed(35);\n robot.init();';
    Blockly.Arduino.addSetup('Scott', setupCode, true);
    //-------------------------------------------------------------------
  var code = 'robot.descendreCrayon();\n';
  return code;
};
*/

Blockly.Arduino['scott_deplacement'] = function(block) {
  var value_distance = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
    Blockly.Arduino.addSetup('Scott', setupCode, true);
    //-------------------------------------------------------------------
  switch (dropdown_type) {
    case 'Avancer':
	  code = 'robot.avancer('+ value_distance +');\n';
	  break;
    case 'Reculer':
	  code = 'robot.reculer('+ value_distance +');\n';
	  break;
  }
  return code;
};

Blockly.Arduino['scott_rotation'] = function(block) {
  var value_angle = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  switch (dropdown_type) {
    case 'droite':
      code = 'robot.tournerDroite('+ value_angle +');\n';
      break;
    case 'gauche':
      code = 'robot.tournerGauche('+ value_angle +');\n';
      break;
  }
  return code;
};

Blockly.Arduino['scott_crayon'] = function(block) {
  var dropdown_type = block.getFieldValue('PEN');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Scott', '#include <Scott.h>');
  Blockly.Arduino.addDeclaration('Scott', 'Scott robot(ORIGINAL);');

  var setupCode = 'robot.setSpeed(35);\n  robot.init();';
  Blockly.Arduino.addSetup('Scott', setupCode, true);
  //-------------------------------------------------------------------
  switch (dropdown_type) {
    case 'Lever':
      code = 'robot.leverCrayon();\n';
      break;
    case 'Descendre':
      code = 'robot.descendreCrayon();\n';
      break;
  }
  return code;
};
