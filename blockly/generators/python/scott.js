
'use strict';

goog.provide('Blockly.Python.scott');
goog.require('Blockly.Python');

//Python Scott block generator



Blockly.Python['scott_forward'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'avancer('+ value +');\n';
  return code;
};

Blockly.Python['scott_backward'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'reculer('+ value +');\n';
  return code;
};

Blockly.Python['scott_right'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'droite('+ value +');\n';
  return code;
};

Blockly.Python['scott_left'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || '0';
  var code = 'gauche('+ value +');\n';
  return code;
};

Blockly.Python['scott_stop'] = function(block) {
  var stop_time = block.getFieldValue('time');
  var code = 'stop('+ stop_time +');\n';
  return code;
};


Blockly.Python['scott_turn_go'] = function(block) {
  var turn_go_angle = block.getFieldValue('angle');
  var turn_go_distance = block.getFieldValue('distance');
  var code = 'turnGo('+ turn_go_angle +','+ turn_go_distance +');\n';
  return code;
};

Blockly.Python['scott_polygone'] = function(block) {
  var number_nbr_cote = block.getFieldValue('nbr_cote');
  var number_taille = block.getFieldValue('taille');
  var code = 'polygone('+ number_nbr_cote +','+ number_taille +');\n';
  return code;
};

Blockly.Python['scott_cercle'] = function(block) {
  var cercle_diametre = block.getFieldValue('diametre');
  var code = 'cercle('+ cercle_diametre +');\n';
  return code;
};

Blockly.Python['scott_ligne'] = function(block) {
  var code = 'lectureLigne()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['scott_contact'] = function(block) {
  var code = 'lectureContact()';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['scott_lever_crayon'] = function(block) {
  var code = 'leverCrayon();\n';
  return code;
};

Blockly.Python['scott_descendre_crayon'] = function(block) {
  var code = 'descendreCrayon();\n';
  return code;
};


Blockly.Python['scott_deplacement'] = function(block) {
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

Blockly.Python['scott_rotation'] = function(block) {
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

Blockly.Python['scott_crayon'] = function(block) {
  var dropdown_type = block.getFieldValue('PEN');
  var code;
  switch (dropdown_type) {
    case 'Lever':
      code = 'leverCrayon();\n';
      break;
    case 'Descendre':
      code = 'descendreCrayon();\n';
      break;
  }
  return code;
};
