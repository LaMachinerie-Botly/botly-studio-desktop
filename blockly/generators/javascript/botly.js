
'use strict';

goog.provide('Blockly.Javascript.botly');
goog.require('Blockly.Javascript');


Blockly.JavaScript['botly_deplacement'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ');\n';
};

Blockly.JavaScript['botly_rotation'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ');\n';
};

Blockly.JavaScript['botly_crayon'] = function(block) {
  // Generate JavaScript for pen up/down.
  return block.getFieldValue('PEN') +
      '(' + ');\n';
};

 Blockly.JavaScript['botly_forward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Avancer";
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['botly_backward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Reculer";
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['botly_right'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'droite';
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['botly_left'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'gauche';
  return func +
      '(' + value + ');\n';
};


Blockly.JavaScript['botly_lever_crayon'] = function(block) {
  return  'Lever'+
      '(' + ');\n';
};

Blockly.JavaScript['botly_descendre_crayon'] = function(block)  {
  return  'Descendre'+
      '(' + ');\n';
};

Blockly.JavaScript['botly_turn_go'] = function(block) {
  // Generate JavaScript for pen up/down.
  return  'turnGo' +
      '(' + block.getFieldValue('angle') + ', ' + block.getFieldValue('distance') + ');\n';

};

Blockly.JavaScript['botly_stop'] = function(block){
  return 'none' +
      '(' + ');\n';
};


Blockly.JavaScript['botly_polygone'] = function(block){
  return 'none' +
      '(' + ');\n';
};


Blockly.JavaScript['botly_cercle'] = function(block){
  return 'none' +
      '(' + ');\n';
};

Blockly.JavaScript['botly_ligne'] = function(block){
  return 'none' +
      '(' + ');\n';
};

Blockly.JavaScript['botly_contact'] = function(block){
  return 'none' +
      '(' + ');\n';
};
