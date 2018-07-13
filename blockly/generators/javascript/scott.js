
'use strict';

goog.provide('Blockly.Javascript.scott');
goog.require('Blockly.Javascript');


Blockly.JavaScript['scott_deplacement'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ');\n';
};

Blockly.JavaScript['scott_rotation'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = block.getFieldValue('VALUE');
  return block.getFieldValue('DIR') +
      '(' + value + ');\n';
};

Blockly.JavaScript['scott_crayon'] = function(block) {
  // Generate JavaScript for pen up/down.
  return block.getFieldValue('PEN') +
      '(' + ');\n';
};

 Blockly.JavaScript['scott_forward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Avancer";
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['scott_backward'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = "Reculer";
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['scott_right'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'droite';
  return func +
      '(' + value + ');\n';
};

Blockly.JavaScript['scott_left'] = function(block) {
  // Generate JavaScript for pen up/down.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var func = 'gauche';
  return func +
      '(' + value + ');\n';
};


Blockly.JavaScript['scott_lever_crayon'] = function(block) {
  return  'Lever'+
      '(' + ');\n';
};

Blockly.JavaScript['scott_descendre_crayon'] = function(block)  {
  return  'Descendre'+
      '(' + ');\n';
};

Blockly.JavaScript['scott_turn_go'] = function(block) {
  // Generate JavaScript for pen up/down.
  return  'turnGo' +
      '(' + block.getFieldValue('angle') + ', ' + block.getFieldValue('distance') + ');\n';

};

Blockly.JavaScript['scott_stop'] = function(block){
  return 'none' +
      '(' + ');\n';
};


Blockly.JavaScript['scott_polygone'] = function(block){
  return 'none' +
      '(' + ');\n';
};


Blockly.JavaScript['scott_cercle'] = function(block){
  return 'none' +
      '(' + ');\n';
};

Blockly.JavaScript['scott_ligne'] = function(block){
  return 'none' +
      '(' + ');\n';
};

Blockly.JavaScript['scott_contact'] = function(block){
  return 'none' +
      '(' + ');\n';
};
