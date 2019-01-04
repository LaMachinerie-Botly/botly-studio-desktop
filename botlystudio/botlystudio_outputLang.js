/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the BotlyStudio Server python program.
 */
'use strict';

BotlyStudio.OUTPUT_LANGUAGE_NAME = {
  1: 'Arduino',
  2: 'Python',
  3: 'JavaScript',
};

BotlyStudio.OUTPUT_LANGUAGE = 1;

BotlyStudio.initOutputLanguage = function() {
  BotlyStudio.populateOutputLangMenu(BotlyStudio.OUTPUT_LANGUAGE);
};

BotlyStudio.populateOutputLangMenu = function(selectedOutputLang) {
  var outputLangMenu = document.getElementById('outputLang');
  outputLangMenu.options.length = 0;

  for (var outputLang in BotlyStudio.OUTPUT_LANGUAGE_NAME) {
    var option = new Option(BotlyStudio.OUTPUT_LANGUAGE_NAME[outputLang], outputLang);
    if (outputLang == selectedOutputLang) {
      option.selected = true;
    }
    outputLangMenu.options.add(option);
  }
  outputLangMenu.onchange = BotlyStudio.changeOutputLang;
};

/** Saves the blocks and reloads with a different language. */
BotlyStudio.changeOutputLang = function() {
  var outputLangMenu = document.getElementById('outputLang');
  var newOutputLang = encodeURIComponent(
      outputLangMenu.options[outputLangMenu.selectedIndex].value);
  var outLang = outputLangMenu.options[outputLangMenu.selectedIndex].value;
  BotlyStudio.OUTPUT_LANGUAGE = outLang;
  BotlyStudio.renderContent();
  return;
};