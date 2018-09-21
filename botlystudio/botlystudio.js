/** Create a namespace for the application. */
var BotlyStudio = BotlyStudio || {};

BotlyStudio.mode = "JS";

/** Initialize function for BotlyStudio, to be called on page load. */
BotlyStudio.init = function() {
  // Lang init must run first for the rest of the page to pick the right msgs
  BotlyStudio.changeToolbox();
  BotlyStudio.initLanguage();
  BotlyStudio.initDifficulty();
  BotlyStudio.initOutputLanguage();
  PluginManager.import();
  BotlyStudioIPC.initIPC();
  // Inject Blockly into content_blocks and fetch additional blocks
  BotlyStudio.injectBlockly(document.getElementById('content_blocks'),
                            BotlyStudio.TOOLBOX_XML, 'blockly/');
  //BotlyStudio.importExtraBlocks();

  BotlyStudio.designJsInit();
  BotlyStudio.initialiseIdeButtons();

  BotlyStudio.bindDesignEventListeners();
  BotlyStudio.bindActionFunctions();
  BotlyStudio.bindBlocklyEventListeners();
  BotlyStudio.renderContent();
};

/** Binds functions to each of the buttons, nav links, and related. */
BotlyStudio.bindActionFunctions = function() {
  // Navigation buttons
  BotlyStudio.bindClick_('button_load', BotlyStudio.loadUserXmlFile);
  BotlyStudio.bindClick_('button_save', BotlyStudio.saveXmlFile);
  BotlyStudio.bindClick_('button_delete', BotlyStudio.discardAllBlocks);

  // Side menu buttons, they also close the side menu
  BotlyStudio.bindClick_('menu_load', function() {
    BotlyStudio.loadUserXmlFile();
    $('.button-collapse').sideNav('hide');
  });
  BotlyStudio.bindClick_('menu_save', function() {
    BotlyStudio.saveXmlFile();
    $('.button-collapse').sideNav('hide');
  });
  BotlyStudio.bindClick_('menu_delete', function() {
    BotlyStudio.discardAllBlocks();
    $('.button-collapse').sideNav('hide');
  });
  BotlyStudio.bindClick_('menu_settings', function() {
    BotlyStudio.openSettings();
    $('.button-collapse').sideNav('hide');
  });
  BotlyStudio.bindClick_('menu_example_1', function() {
    BotlyStudio.loadServerXmlFile('../examples/Scott_dessin.xml');
    $('.button-collapse').sideNav('hide');
  });



  BotlyStudio.bindClick_('button_ide_large', function () {
    BotlyStudio.ideButtonLargeAction();
  });
  BotlyStudio.bindClick_('button_ide_middle', function () {
    BotlyStudio.ideButtonMiddleAction();
  });
  BotlyStudio.bindClick_('button_ide_left', function () {
    BotlyStudio.ideButtonLeftAction();
  });
  BotlyStudio.bindClick_('button_ide_last', function () {
    BotlyStudio.ideButtonLastAction();
  });
  BotlyStudio.bindClick_('button_ide_addon', function () {
    BotlyStudio.ideButtonAddonAction();
  });

  BotlyStudio.bindClick_('button_toggle_toolbox', BotlyStudio.toogleToolbox);
  BotlyStudio.bindClick_('setCompilerLocationButton', function () {
    BotlyStudioIPC.setCompilerLocation();
  });
};


BotlyStudio.ideButtonLargeAction =  function(){
  BotlyStudio.ideSendUpload();
};


BotlyStudio.ideButtonMiddleAction =  function(){
  BotlyStudio.ideSendVerify();
};


BotlyStudio.ideButtonLeftAction = function(){
  BotlyStudio.ideSendOpen();
};

BotlyStudio.ideButtonLastAction = function(){
  BotlyStudio.devTools();
};

BotlyStudio.ideButtonAddonAction = function(){
  BotlyStudio.discardAllBlocks();
}

/** Sets the BotlyStudio server IDE setting to upload and sends the code. */
BotlyStudio.ideSendUpload = function () {
  BotlyStudio.shortMessage(BotlyStudio.getLocalStr('verifyingSketch'));
  BotlyStudio.resetIdeOutputContent();
  BotlyStudio.sendCode("upload");
};

/** Sets the BotlyStudio server IDE setting to verify and sends the code. */
BotlyStudio.ideSendVerify = function () {
  BotlyStudio.shortMessage(BotlyStudio.getLocalStr('verifyingSketch'));
  BotlyStudio.resetIdeOutputContent();
  BotlyStudio.sendCode("compile");
};

/** Sets the BotlyStudio server IDE setting to open and sends the code. */
BotlyStudio.ideSendOpen = function () {
  BotlyStudio.shortMessage(BotlyStudio.getLocalStr('openingSketch'));
  BotlyStudio.resetIdeOutputContent();
  BotlyStudio.sendCode("openIDE");
};


/**
 * Send the Arduino Code to the BotlyStudioIPC to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
BotlyStudio.sendCode = function (flag) {
  BotlyStudio.largeIdeButtonSpinner(true);
  BotlyStudioIPC.sendSketchToServer(BotlyStudio.generateArduino(), flag);
};


/** Initialises the IDE buttons with the default option from the server. */
BotlyStudio.initialiseIdeButtons = function() {
  document.getElementById('button_ide_left').title = "Ouvrir dans l'IDE";
  document.getElementById('button_ide_middle').title = "Vérifier";
  document.getElementById('button_ide_large').title = "Téléverser";
  document.getElementById('button_ide_last').title = "Tout supprimer";
};

/**
 * Loads an XML file from the server and replaces the current blocks into the
 * Blockly workspace.
 * @param {!string} xmlFile Server location of the XML file to load.
 */
BotlyStudio.loadServerXmlFile = function(xmlFile) {
  var loadXmlfileAccepted = function() {
    // loadXmlBlockFile loads the file asynchronously and needs a callback
    var loadXmlCb = function(sucess) {
      if (sucess) {
        BotlyStudio.renderContent();
      } else {
        BotlyStudio.alertMessage(
            BotlyStudio.getLocalStr('invalidXmlTitle'),
            BotlyStudio.getLocalStr('invalidXmlBody'),
            false);
      }
    };
    var connectionErrorCb = function() {
    };
    BotlyStudio.loadXmlBlockFile(xmlFile, loadXmlCb, connectionErrorCb);
  };

  if (BotlyStudio.isWorkspaceEmpty()) {
    loadXmlfileAccepted();
  } else {
    BotlyStudio.alertMessage(
        BotlyStudio.getLocalStr('loadNewBlocksTitle'),
        BotlyStudio.getLocalStr('loadNewBlocksBody'),
        true, loadXmlfileAccepted);
  }
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
BotlyStudio.loadUserXmlFile = function() {
  // Create File Reader event listener function
  var parseInputXMLfile = function(e) {
    var xmlFile = e.target.files[0];
    var filename = xmlFile.name;
    var extensionPosition = filename.lastIndexOf('.');
    if (extensionPosition !== -1) {
      filename = filename.substr(0, extensionPosition);
    }

    var reader = new FileReader();
    reader.onload = function() {
      var success = BotlyStudio.replaceBlocksfromXml(reader.result);
      if (success) {
        BotlyStudio.renderContent();
        BotlyStudio.sketchNameSet(filename);
      } else {
        BotlyStudio.alertMessage(
            BotlyStudio.getLocalStr('invalidXmlTitle'),
            BotlyStudio.getLocalStr('invalidXmlBody'),
            false);
      }
    };
    reader.readAsText(xmlFile);
  };

  // Create once invisible browse button with event listener, and click it
  var selectFile = document.getElementById('select_file');
  if (selectFile === null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';

    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);

    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
BotlyStudio.saveXmlFile = function() {
  BotlyStudio.saveTextFileAs(
      document.getElementById('sketch_name').value + '.xml',
      BotlyStudio.generateXml());
};

/**
 * Creates an Arduino Sketch file containing the Arduino code generated from
 * the Blockly workspace and prompts the users to save it into their local file
 * system.
 */
BotlyStudio.saveSketchFile = function() {
  BotlyStudio.saveTextFileAs(
      document.getElementById('sketch_name').value + '.ino',
      BotlyStudio.generateArduino());
};

/**
 * Creates an text file with the input content and files name, and prompts the
 * users to save it into their local file system.
 * @param {!string} fileName Name for the file to be saved.
 * @param {!string} content Text datd to be saved in to the file.
 */
BotlyStudio.saveTextFileAs = function(fileName, content) {
  var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, fileName);
};

/**
 * Retrieves the Settings from BotlyStudioServer to populates the form data
 * and opens the Settings modal dialog.
 */
BotlyStudio.openSettings = function() {
  BotlyStudioIPC.requestCompilerLocation(
    BotlyStudio.setCompilerLocationHtml);
  BotlyStudioIPC.requestSerialPorts(BotlyStudio.setSerialPortsHtml);
  BotlyStudioIPC.requestRobot();
  // Language menu only set on page load within BotlyStudio.initLanguage()
  BotlyStudio.openSettingsModal();
};

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
BotlyStudio.setCompilerLocationHtml = function (jsonResponse) {
  var newEl = BotlyStudioIPC.createElementFromJson(jsonResponse);
  var compLocIp = document.getElementById('settings_compiler_location');
  if (compLocIp != null) {
    compLocIp.value = newEl.value;
  }
};


/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
BotlyStudio.setArduinoBoardsHtml = function (board) {
  var newEl = new JSON;
  newEl.value = board;
  var boardDropdown = document.getElementById('board');
  if (boardDropdown !== null) {
    // Restarting the select elements built by materialize
    $('select').material_select('destroy');
    newEl.name = 'settings_board';
    newEl.id = 'board';
    newEl.onchange = BotlyStudio.setBoard;
    boardDropdown.parentNode.replaceChild(newEl, boardDropdown);
    // Refresh the materialize select menus
    $('select').material_select();
  }
};


/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
BotlyStudio.setBoard = function () {
  var el = document.getElementById('board');
  var boardValue = el.options[el.selectedIndex].value;
  //TODO: Check how BotlyStudioIPC deals with invalid data and sanitise
  BotlyStudioIPC.setArduinoBoard(
    boardValue, BotlyStudio.setArduinoBoardsHtml);
  BotlyStudio.changeBlocklyArduinoBoard(
    boardValue.toLowerCase().replace(/ /g, '_'));
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
BotlyStudio.setSerialPortsHtml = function (jsonResponse) {

  //if (jsonResponse === null) return BotlyStudio.openNotConnectedModal();
  var newEl = BotlyStudioIPC.createElementFromJson(jsonResponse);
  var serialDropdown = document.getElementById('serial_port');
  if (serialDropdown !== null) {
    // Restarting the select elements built by materialize
    $('select').material_select('destroy');
    newEl.name = 'settings_serial';
    newEl.id = 'serial_port';
    newEl.onchange = BotlyStudio.setSerial;
    serialDropdown.parentNode.replaceChild(newEl, serialDropdown);
    // Refresh the materialize select menus
    $('select').material_select();
  }
};


/** Sets the Serial Port with the selected user input from the drop down. */
BotlyStudio.setSerial = function () {
  var el = document.getElementById('serial_port');
  var serialValue = el.options[el.selectedIndex].value;
  //TODO: check how BotlyStudioIPC deals with invalid data and sanitise
  BotlyStudioIPC.setSerialPort(
    serialValue, BotlyStudio.setSerialPortsHtml);
};

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
BotlyStudio.setIdeHtml = function (jsonResponse) {
  var newEl = BotlyStudioIPC.createElementFromJson(jsonResponse);
  var ideDropdown = document.getElementById('ide_settings');
  if (ideDropdown !== null) {
    // Restarting the select elements built by materialize
    $('select').material_select('destroy');
    newEl.name = 'settings_ide';
    newEl.id = 'ide_settings';
    newEl.onchange = BotlyStudio.setIdeSettings;
    ideDropdown.parentNode.replaceChild(newEl, ideDropdown);
    // Refresh the materialize select menus
    $('select').material_select();
  }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 * @param {Event} e Event that triggered this function call. Required for link
 *     it to the listeners, but not used.
 * @param {string} preset A value to set the IDE settings bypassing the drop
 *     down selected value. Valid data: 'upload', 'verify', or 'open'.
 */
BotlyStudio.setIdeSettings = function (e, preset) {
  if (preset !== undefined) {
    var ideValue = preset;
  } else {
    var el = document.getElementById('ide_settings');
    var ideValue = el.options[el.selectedIndex].value;
  }
  BotlyStudio.changeIdeButtons(ideValue);
  //TODO: check how BotlyStudioIPC deals with invalid data and sanitise here
  BotlyStudioIPC.setIdeOptions(ideValue, BotlyStudio.setIdeHtml);
};

/** Populate the workspace blocks with the XML written in the XML text area. */
BotlyStudio.XmlTextareaToBlocks = function() {
  var success = BotlyStudio.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    BotlyStudio.renderContent();
  } else {
    BotlyStudio.alertMessage(
        BotlyStudio.getLocalStr('invalidXmlTitle'),
        BotlyStudio.getLocalStr('invalidXmlBody'),
        false);
  }
};

/**
 * Private variable to save the previous version of the Arduino Code.
 * @type {!String}
 * @private
 */
BotlyStudio.PREV_OUTPUT_CODE_ = 'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';

/**
 * Populate the Arduino Code and Blocks XML panels with content generated from
 * the blocks.
 */
BotlyStudio.renderContent = function() {
  // Only regenerate the code if a block is not being dragged
  if (BotlyStudio.blocklyIsDragging()) return;

  // Render Arduino Code with latest change highlight and syntax highlighting

  var outputCode = "";
  if(BotlyStudio.OUTPUT_LANGUAGE == 1){
	outputCode = BotlyStudio.generateArduino();
  }else if(BotlyStudio.OUTPUT_LANGUAGE == 2){
	outputCode = BotlyStudio.generatePython();
  }else if(BotlyStudio.OUTPUT_LANGUAGE == 3){
	outputCode = BotlyStudio.generateJavaScript();
  }


  if (outputCode !== BotlyStudio.PREV_OUTPUT_CODE_) {
    var diff = JsDiff.diffWords(BotlyStudio.PREV_OUTPUT_CODE_, outputCode);
    var resultStringArray = [];
    for (var i = 0; i < diff.length; i++) {
      if (!diff[i].removed) {
        var escapedCode = diff[i].value.replace(/</g, '&lt;')
                                       .replace(/>/g, '&gt;');
        if (diff[i].added) {
          resultStringArray.push(
              '<span class="code_highlight_new">' + escapedCode + '</span>');
        } else {
          resultStringArray.push(escapedCode);
        }
      }
    }
    BotlyStudio.PREV_OUTPUT_CODE_ = outputCode;

	if(BotlyStudio.OUTPUT_LANGUAGE == 1){
		document.getElementById('content_code').innerHTML =
			prettyPrintOne(resultStringArray.join(''), 'cpp', false);
	}else if(BotlyStudio.OUTPUT_LANGUAGE == 2){
		document.getElementById('content_code').innerHTML =
			prettyPrintOne(resultStringArray.join(''), 'py', false);
	}else if(BotlyStudio.OUTPUT_LANGUAGE == 3){
		document.getElementById('content_code').innerHTML =
			prettyPrintOne(resultStringArray.join(''), 'js', false);
	}

  }

  // Generate plain XML into element
  document.getElementById('content_xml').value = BotlyStudio.generateXml();
};


BotlyStudio.devTools = function () {
  $('#code_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};



/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
BotlyStudio.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the blockly toolbox and the BotlyStudio toolbox button On and Off.
 * Uses namespace member variable TOOLBAR_SHOWING_ to toggle state.
 */
BotlyStudio.toogleToolbox = function() {
  if (BotlyStudio.TOOLBAR_SHOWING_) {
    BotlyStudio.blocklyCloseToolbox();
    BotlyStudio.displayToolbox(false);
  } else {
    BotlyStudio.displayToolbox(true);
  }
  BotlyStudio.TOOLBAR_SHOWING_ = !BotlyStudio.TOOLBAR_SHOWING_;
};

/** @return {boolean} Indicates if the toolbox is currently visible. */
BotlyStudio.isToolboxVisible = function() {
  return BotlyStudio.TOOLBAR_SHOWING_;
};

/**
 * Lazy loads the additional block JS files from the ./block directory.
 * Initialises any additional BotlyStudio extensions.
 * TODO: Loads the examples into the examples modal
 */
BotlyStudio.importExtraBlocks = function() {
  /**
   * Parses the JSON data to find the block and languages js files.
   * @param {jsonDataObj} jsonDataObj JSON in JavaScript object format, null
   *     indicates an error occurred.
   * @return {undefined} Might exit early if response is null.
   */
  var jsonDataCb = function(jsonDataObj) {
    if (jsonDataObj.categories !== undefined) {
      var head = document.getElementsByTagName('head')[0];
      for (var catDir in jsonDataObj.categories) {
        var blocksJsLoad = document.createElement('script');
        blocksJsLoad.src = '../blocks/' + catDir + '/blocks.js';
        head.appendChild(blocksJsLoad);

        var blocksLangJsLoad = document.createElement('script');
        blocksLangJsLoad.src = '../blocks/' + catDir + '/msg/' + 'messages.js';
            //'lang/' + BotlyStudio.LANG + '.js';
        head.appendChild(blocksLangJsLoad);

        var blocksGeneratorJsLoad = document.createElement('script');
        blocksGeneratorJsLoad.src = '../blocks/' + catDir +
            '/generator_arduino.js';
        head.appendChild(blocksGeneratorJsLoad);

        // Check if the blocks add additional BotlyStudio functionality
        var extensions = jsonDataObj.categories[catDir].extensions;
        if (extensions) {
          for (var i = 0; i < extensions.length; i++) {
            var blockExtensionJsLoad = document.createElement('script');
            blockExtensionJsLoad.src = '../blocks/' + catDir + '/extensions.js';
            head.appendChild(blockExtensionJsLoad);
            // Add function to scheduler as lazy loading has to complete first
            setTimeout(function(category, extension) {
              var extensionNamespaces = extension.split('.');
              var extensionCall = window;
              var invalidFunc = false;
              for (var j = 0; j < extensionNamespaces.length; j++) {
                extensionCall = extensionCall[extensionNamespaces[j]];
                if (extensionCall === undefined) {
                  invalidFunc = true;
                  break;
                }
              }
              if (typeof extensionCall != 'function') {
                invalidFunc = true;
              }
              if (invalidFunc) {
                throw 'Blocks ' + category.categoryName + ' extension "' +
                      extension + '" is not a valid function.';
              } else {
                extensionCall();
              }
            }, 800, jsonDataObj.categories[catDir], extensions[i]);
          }
        }
      }
    }
  };
  // Reads the JSON data containing all block categories from ./blocks directory
  // TODO: Now reading a local file, to be replaced by server generated JSON
  BotlyStudio.getJsonData('../blocks/blocks_data.json', jsonDataCb);
};

/** Opens a modal with a list of categories to add or remove to the toolbox */
BotlyStudio.openExtraCategoriesSelect = function() {
  /**
   * Parses the JSON data from the server into a list of additional categories.
   * @param {jsonDataObj} jsonDataObj JSON in JavaScript object format, null
   *     indicates an error occurred.
   * @return {undefined} Might exit early if response is null.
   */
  var jsonDataCb = function(jsonDataObj) {
    var htmlContent = document.createElement('div');
    if (jsonDataObj.categories !== undefined) {
      for (var catDir in jsonDataObj.categories) {
        // Function required to maintain each loop variable scope separated
        (function(cat) {
          var clickBind = function(tickValue) {
            if (tickValue) {
              var catDom = (new DOMParser()).parseFromString(
                  cat.toolbox.join(''), 'text/xml').firstChild;
              BotlyStudio.addToolboxCategory(cat.toolboxName, catDom);
            } else {
              BotlyStudio.removeToolboxCategory(cat.toolboxName);
            }
          };
          htmlContent.appendChild(BotlyStudio.createExtraBlocksCatHtml(
              cat.categoryName, cat.description, clickBind));
        })(jsonDataObj.categories[catDir]);
      }
    }
    BotlyStudio.openAdditionalBlocksModal(htmlContent);
  };
  // Reads the JSON data containing all block categories from ./blocks directory
  // TODO: Now reading a local file, to be replaced by server generated JSON
  BotlyStudio.getJsonData('../blocks/blocks_data.json', jsonDataCb);
};

/** Informs the user that the selected function is not yet implemented. */
BotlyStudio.notImplemented = function() {
  BotlyStudio.shortMessage('Function not yet implemented');
};

/**
 * Interface to display messages with a possible action.
 * @param {!string} title HTML to include in title.
 * @param {!element} body HTML to include in body.
 * @param {boolean=} confirm Indicates if the user is shown a single option (ok)
 *     or an option to cancel, with an action applied to the "ok".
 * @param {string=|function=} callback If confirm option is selected this would
 *     be the function called when clicked 'OK'.
 */
BotlyStudio.alertMessage = function(title, body, confirm, callback) {
  BotlyStudio.materialAlert(title, body, confirm, callback);
};

/**
 * Interface to displays a short message, which disappears after a time out.
 * @param {!string} message Text to be temporarily displayed.
 */
BotlyStudio.shortMessage = function(message) {
  BotlyStudio.MaterialToast(message);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
BotlyStudio.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};
