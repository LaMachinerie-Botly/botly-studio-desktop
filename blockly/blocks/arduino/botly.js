/**
*	Botly Robot Blocks Library
*	    La Machinerie 2017
*
*          Adrien Bracq
*	  Modify by Jules Topart
*
*/


'use strict';

goog.provide('Blockly.Blocks.botly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.botly.HUE = 60;


Blockly.Blocks['botly_forward'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
		.appendField("Avancer de ");
	this.appendDummyInput()
        .appendField("mm");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
	this.setTooltip("Fait avancer le robot de x mm");
	this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_backward'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
		.appendField("Reculer de ");
	this.appendDummyInput()
        .appendField("mm");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
	this.setTooltip("Fait reculer le robot de x mm");
	this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_right'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
    .appendField("Tourner à droite de");
  this.appendDummyInput()
        .appendField("°");
    this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_left'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck("Number")
    .appendField("Tourner à gauche de");
  this.appendDummyInput()
        .appendField("°");
    this.setInputsInline(true);
	this.setPreviousStatement(true, null);
	this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("S'arreter pendant ")
        .appendField(
            new Blockly.FieldTextInput(
                '10', Blockly.FieldTextInput.numberValidator),
            'time')
        .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_turn_go'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tourner de ")
        .appendField(new Blockly.FieldAngle(90), "angle")
        .appendField("puis avancer de ")
        .appendField(
            new Blockly.FieldTextInput(
                '10', Blockly.FieldTextInput.numberValidator),
            'distance')
        .appendField("mm");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_polygone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dessine un polygone régulier de")
        .appendField(new Blockly.FieldNumber(3, 0), "nbr_cote")
        .appendField("cotés de")
        .appendField(
            new Blockly.FieldTextInput(
                '10', Blockly.FieldTextInput.numberValidator),
            'taille')
        .appendField("mm");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_cercle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Trace un cercle de diamètre ")
        .appendField(
            new Blockly.FieldTextInput(
                '10', Blockly.FieldTextInput.numberValidator),
            'diametre')
        .appendField("mm");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_ligne'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Position de la ligne");
    this.setOutput(true, "Number");
    this.setColour(105);
 this.setTooltip("=50 : ligne au centre / >50 : ligne à gauche / <50 : ligne à droite");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_contact'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Position de l'objet en contact");
    this.setOutput(true, "Number");
    this.setColour(105);
 this.setTooltip("=0 : pas de contact / 1 : contact à droite / 2 : contact à gauche / 3 : contact à gauche et à droite");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_lever_crayon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lever le crayon");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_descendre_crayon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Descendre le crayon");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_deplacement'] = {
  init: function() {
	this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Avancer","Avancer"], ["Reculer","Reculer"]]), 'DIR')
        .appendField("de")
        .appendField(
            new Blockly.FieldTextInput(
                '10', Blockly.FieldTextInput.numberValidator),
            'VALUE')
        .appendField("mm");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_rotation'] = {
  init: function() {
	this.appendDummyInput()
        .appendField("Tourner à")
        .appendField(new Blockly.FieldDropdown([["gauche","gauche"], ["droite","droite"]]), "DIR")
        .appendField("de")
        .appendField(new Blockly.FieldAngle(90), "VALUE")
        .appendField("°");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['botly_crayon'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Lever","Lever"], ["Descendre","Descendre"]]), "PEN")
        .appendField("le crayon");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
