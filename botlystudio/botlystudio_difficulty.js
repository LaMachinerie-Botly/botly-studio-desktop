/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the BotlyStudio Server python program.
 */
'use strict';
/** Create a namespace for the application. */
var BotlyStudio = BotlyStudio || {};

/**********************************
	Permet de réduire la quantité 
	de bloc en fonction du besoin
	1- Débutant (Bloc basique)
	2- Intermédiaire
	3- Comfirmé
	4- Expert (Tous les blocs)
***********************************/
BotlyStudio.DIFFICULTY_NAME = {
  1: 'Novice',
  2: 'Debutant',
  3: 'Moyen',
  4: 'Expert'
};

/**********************************
	Permet de réduire la quantité 
	de bloc en fonction du besoin
	1- Débutant (Bloc basique)
	2- Intermédiaire
	3- Comfirmé
	4- Expert (Tous les blocs)
***********************************/
BotlyStudio.DIFFICULTY = 1;

BotlyStudio.initDifficulty = function() {
  BotlyStudio.populateDifficultyMenu(BotlyStudio.DIFFICULTY);
};

BotlyStudio.populateDifficultyMenu = function(selectedDifficulty) {
  var difficultyMenu = document.getElementById('difficulty');
  difficultyMenu.options.length = 0;

  for (var difficulty in BotlyStudio.DIFFICULTY_NAME) {
    var option = new Option(BotlyStudio.DIFFICULTY_NAME[difficulty], difficulty);
    if (difficulty == selectedDifficulty) {
      option.selected = true;
    }
    difficultyMenu.options.add(option);
  }
  difficultyMenu.onchange = BotlyStudio.changeDifficulty;
};

/** Saves the blocks and reloads with a different language. */
BotlyStudio.changeDifficulty = function() {
  var difficultyMenu = document.getElementById('difficulty');
  var newDifficulty = encodeURIComponent(
      difficultyMenu.options[difficultyMenu.selectedIndex].value);
  var diff = difficultyMenu.options[difficultyMenu.selectedIndex].value;
  BotlyStudio.DIFFICULTY = diff;
  BotlyStudio.changeToolbox();
  BotlyStudio.xmlTree = Blockly.Xml.textToDom(BotlyStudio.TOOLBOX_XML);
  BotlyStudio.updateToolboxLanguage();
  BotlyStudio.workspace.updateToolbox(BotlyStudio.xmlTree);
  return;
};