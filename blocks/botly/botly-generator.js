
'use strict';

goog.provide('Blockly.Arduino.botly');
goog.require('Blockly.Arduino');


Blockly.Arduino['botly_forward'] = function(block) {
  var forward_distance = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = 'robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.avancer('+ forward_distance +');\n';
  return code;
};

Blockly.Arduino['botly_backward'] = function(block) {
  var backward_distance = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = 'robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.reculer('+ backward_distance +');\n';
  return code;
};

Blockly.Arduino['botly_right'] = function(block) {
  var right_angle = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = 'robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.tournerDroite('+ right_angle +');\n';
  return code;
};

Blockly.Arduino['botly_left'] = function(block) {
  var left_angle = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = 'robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.tournerGauche('+ left_angle +');\n';
  return code;
};


Blockly.Arduino['botly_turn_go'] = function(block) {
  var turn_go_angle = block.getFieldValue('angle');
  var turn_go_distance = block.getFieldValue('distance');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.turnGoDegree('+ turn_go_angle +','+ turn_go_distance +');\n';
  return code;
};

Blockly.Arduino['botly_polygone'] = function(block) {
  var number_nbr_cote = block.getFieldValue('nbr_cote');
  var number_taille = block.getFieldValue('taille');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.polygone('+ number_nbr_cote +','+ number_taille +');\n';
  return code;
};

Blockly.Arduino['botly_cercle'] = function(block) {
  var cercle_diametre = block.getFieldValue('diametre');
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.cercle('+ cercle_diametre +');\n';
  return code;
};

Blockly.Arduino['botly_ligne'] = function(block) {
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.lectureLigne()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['botly_contact'] = function(block) {
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  var code = 'robot.lectureContact()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['botly_deplacement'] = function(block) {
  var value_distance = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
    Blockly.Arduino.addSetup('Botly', setupCode, true);
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

Blockly.Arduino['botly_rotation'] = function(block) {
  var value_angle = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
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

Blockly.Arduino['botly_crayon'] = function(block) {
  var dropdown_type = block.getFieldValue('PEN');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();';
  Blockly.Arduino.addSetup('Botly', setupCode, true);
  //-------------------------------------------------------------------
  switch (dropdown_type) {
    case 'Lever':
      code = 'robot.leverCrayon();\n';
      break;
    case 'Descendre':
      code = 'robot.poserCrayon();\n';
      break;
  }
  return code;
};


Blockly.Arduino['botly_calibration'] = function(block) {
  var number_mm_to_step = block.getFieldValue('MM_TO_STEP');
  var number_rad_to_step = block.getFieldValue('RAD_TO_STEP');
  var code;
  //-------------------------------------------------------------------
  Blockly.Arduino.addInclude('Botly', '#include <Botly.h>');
  Blockly.Arduino.addDeclaration('Botly', 'Botly robot;');

  var setupCode = ' robot.init();\n'+'robot.setCalibration('+ number_mm_to_step +','+ number_rad_to_step +');\n';
  Blockly.Arduino.addSetup('Botly', setupCode, true);

  return code;
};



/*************************************
 *                                   *
 *        Python Generator           *
 *                                   *
 *************************************/

goog.provide('Blockly.Python.botly');
goog.require('Blockly.Python');

//Python Botly block generator



Blockly.Python['botly_forward'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'avancer('+ value +');\n';
  return code;
};

Blockly.Python['botly_backward'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'reculer('+ value +');\n';
  return code;
};

Blockly.Python['botly_right'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'droite('+ value +');\n';
  return code;
};

Blockly.Python['botly_left'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'gauche('+ value +');\n';
  return code;
};

Blockly.Python['botly_stop'] = function(block) {
  var stop_time = block.getFieldValue('time');
  var code = 'stop('+ stop_time +');\n';
  return code;
};


Blockly.Python['botly_turn_go'] = function(block) {
  var turn_go_angle = block.getFieldValue('angle');
  var turn_go_distance = block.getFieldValue('distance');
  var code = 'turnGo('+ turn_go_angle +','+ turn_go_distance +');\n';
  return code;
};

Blockly.Python['botly_polygone'] = function(block) {
  var number_nbr_cote = block.getFieldValue('nbr_cote');
  var number_taille = block.getFieldValue('taille');
  var code = 'polygone('+ number_nbr_cote +','+ number_taille +');\n';
  return code;
};

Blockly.Python['botly_cercle'] = function(block) {
  var cercle_diametre = block.getFieldValue('diametre');
  var code = 'cercle('+ cercle_diametre +');\n';
  return code;
};

Blockly.Python['botly_ligne'] = function(block) {
  var code = 'lectureLigne()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['botly_contact'] = function(block) {
  var code = 'lectureContact()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['botly_lever_crayon'] = function(block) {
  var code = 'leverCrayon();\n';
  return code;
};

Blockly.Python['botly_descendre_crayon'] = function(block) {
  var code = 'poserCrayon();\n';
  return code;
};


Blockly.Python['botly_deplacement'] = function(block) {
  var value_distance = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  switch (dropdown_type) {
    case 'Avancer':
	  code = 'avancer('+ value_distance +');\n';
	  break;
    case 'Reculer':
	  code = 'reculer('+ value_distance +');\n';
	  break;
  }
  return code;
};

Blockly.Python['botly_rotation'] = function(block) {
  var value_angle = block.getFieldValue('VALUE');
  var dropdown_type = block.getFieldValue('DIR');
  var code;
  switch (dropdown_type) {
    case 'droite':
      code = 'droite('+ value_angle +');\n';
      break;
    case 'gauche':
      code = 'gauche('+ value_angle +');\n';
      break;
  }
  return code;
};

Blockly.Python['botly_crayon'] = function(block) {
  var dropdown_type = block.getFieldValue('PEN');
  var code;
  switch (dropdown_type) {
    case 'Lever':
      code = 'leverCrayon();\n';
      break;
    case 'Descendre':
      code = 'poserCrayon();\n';
      break;
  }
  return code;
};


/*************************************
 *                                   *
 *        JS Generator           *
 *                                   *
 *************************************/



goog.provide('Blockly.Javascript.botly');
goog.require('Blockly.Javascript');


Blockly.JavaScript['botly_deplacement'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ', "' + block.id + '");\n';
};

Blockly.JavaScript['botly_rotation'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ', "' + block.id + '");\n';
};

Blockly.JavaScript['botly_crayon'] = function(block) {
  // Generate JavaScript for pen up/down.
  return block.getFieldValue('PEN') +
      '("' + block.id + '");\n';
};

 Blockly.JavaScript['botly_forward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Avancer";
  return func +
      '(' + value + ', "' + block.id + '");\n';
};

Blockly.JavaScript['botly_backward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Reculer";
  return func +
      '(' + value + ', "' + block.id + '");\n';
};

Blockly.JavaScript['botly_right'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'droite';
  return func +
      '(' + value + ', "' + block.id + '");\n';
};

Blockly.JavaScript['botly_left'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'gauche';
  return func +
      '(' + value + ', "' + block.id + '");\n';
};


Blockly.JavaScript['botly_lever_crayon'] = function(block) {
  return  'Lever'+
      '("' + block.id + '");\n';
};

Blockly.JavaScript['botly_descendre_crayon'] = function(block)  {
  return  'Descendre'+
      '("' + block.id + '");\n';
};

Blockly.JavaScript['botly_turn_go'] = function(block) {
  // Generate JavaScript for pen up/down.
  return  'turnGo' +
      '(' + block.getFieldValue('angle') + ', ' + block.getFieldValue('distance') + ', "' + block.id + '");\n';

};

Blockly.JavaScript['botly_stop'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};


Blockly.JavaScript['botly_polygone'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};


Blockly.JavaScript['botly_cercle'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};

Blockly.JavaScript['botly_ligne'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};


Blockly.JavaScript['botly_calibration'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};

Blockly.JavaScript['botly_contact'] = function(block){
  return 'none' +
      '("' + block.id + '");\n';
};


Blockly.JavaScript['arduino_functions'] = function(block){
  var branch = Blockly.JavaScript.statementToCode(block, 'SETUP_FUNC');
  var code = '';
  if(branch){
    code += '//Setup :\n' + branch;
  }
  
  branch = Blockly.JavaScript.statementToCode(block, 'LOOP_FUNC');
  
  if(branch){
	code += '//Loop :\nwhile(true){\n' + branch + '}';
  }
  return code + '\n';
};

/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.JavaScript['infinite_loop'] = function(block) {
  return 'while(true);\n';
};
