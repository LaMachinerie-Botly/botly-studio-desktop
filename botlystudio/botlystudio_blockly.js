/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview BotlyStudio JavaScript for the Blockly resources and bindings.
 */
'use strict';

/** Create a namespace for the application. */
var BotlyStudio = BotlyStudio || {};

/**
 * Blockly main workspace.
 * @type Blockly.WorkspaceSvg
 */
BotlyStudio.workspace = null;

/**
 * Blockly workspace toolbox XML.
 * @type Element
 */
BotlyStudio.xmlTree = null;

/**
 * Injects Blockly into a given HTML element. Toolbox XMl has to be a string.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxXml String containing the toolbox XML content.
 * @param {!string} blocklyPath String containing the Blockly directory path.
 */
BotlyStudio.injectBlockly = function(blocklyEl, toolboxXml, blocklyPath) {
  // Remove any trailing slashes in the blockly path
  if (blocklyPath.substr(-1) === '/') {
    blocklyPath = blocklyPath.slice(0, -1);
  }
  BotlyStudio.xmlTree = Blockly.Xml.textToDom(toolboxXml);
  // The Toolbox menu language is edited directly from the XML nodes.
  BotlyStudio.updateToolboxLanguage();
  BotlyStudio.workspace = Blockly.inject(blocklyEl, {
      collapse: true,
      comments: true,
      css: true,
      disable: true,
      grid: false,
      maxBlocks: Infinity,
      media: blocklyPath + '/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      toolbox: BotlyStudio.xmlTree,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.2
      }
  });
  // On language change the blocks have been stored in session storage
  BotlyStudio.loadSessionStorageBlocks();
};

/** Binds the event listeners relevant to Blockly. */
BotlyStudio.bindBlocklyEventListeners = function() {
  BotlyStudio.workspace.addChangeListener(BotlyStudio.renderContent);

  // Ensure the Blockly workspace resizes accordingly
  window.addEventListener('resize',
      function() {
		  Blockly.asyncSvgResize(BotlyStudio.workspace);
		}, false);
};

/** @return {!string} Generated Arduino code from the Blockly workspace. */
BotlyStudio.generateArduino = function() {
  return Blockly.Arduino.workspaceToCode(BotlyStudio.workspace);
};


/** @return {!string} Generated Javascript code from the Blockly workspace. */
BotlyStudio.generateJavaScript = function() {
  return Blockly.JavaScript.workspaceToCode(BotlyStudio.workspace);
};


/** @return {!string} Generated Python code from the Blockly workspace. */
BotlyStudio.generatePython = function() {
  return Blockly.Python.workspaceToCode(BotlyStudio.workspace);
};

/** @return {!string} Generated XML code from the Blockly workspace. */
BotlyStudio.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(BotlyStudio.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
  return xmlText;
};

/**
 * Loads an XML file from the server and replaces the current blocks into the
 * Blockly workspace.
 * @param {!string} xmlFile XML file path in a reachable server (no local path).
 * @param {!function} cbSuccess Function to be called once the file is loaded.
 * @param {!function} cbError Function to be called if there is a connection
 *     error to the XML server.
 */
BotlyStudio.loadXmlBlockFile = function(xmlFile, cbSuccess, cbError) {
  var request = BotlyStudio.ajaxRequest();
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var success = BotlyStudio.replaceBlocksfromXml(request.responseText);
        cbSuccess(success);
      } else {
        cbError();
      }
    }
  };
  try {
    request.open('GET', xmlFile, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    cbError();
  }
};

/**
 * Parses the XML from its argument input to generate and replace the blocks
 * in the Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
BotlyStudio.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  BotlyStudio.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = BotlyStudio.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its argument input to generate and add blocks to the
 * Blockly workspace.
 * @param {!string} blocksXmlDom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
BotlyStudio.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(blocksXmlDom, BotlyStudio.workspace);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Save blocks into session storage. Note that MSIE 11 does not support
 * sessionStorage on file:// URLs.
 */
BotlyStudio.saveSessionStorageBlocks = function() {
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(BotlyStudio.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};

/** Load blocks saved on session storage and deletes them from storage. */
BotlyStudio.loadSessionStorageBlocks = function() {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if (loadOnce) {
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, BotlyStudio.workspace);
  }
};

/** Discard all blocks from the workspace. */
BotlyStudio.discardAllBlocks = function() {
  var blockCount = BotlyStudio.workspace.getAllBlocks().length;
  if (blockCount == 1) {
    BotlyStudio.workspace.clear();
    BotlyStudio.renderContent();
  } else if (blockCount > 1) {
    BotlyStudio.alertMessage(
        BotlyStudio.getLocalStr('discardBlocksTitle'),
        BotlyStudio.getLocalStr('discardBlocksBody')
            .replace('%1', blockCount),
        true,
        function() {
          BotlyStudio.workspace.clear();
          BotlyStudio.renderContent();
        });
  }
};

/** @return {!boolean} Indicates if the Blockly workspace has blocks. */
BotlyStudio.isWorkspaceEmpty = function() {
  return BotlyStudio.workspace.getAllBlocks().length ? false : true;
};

/**
 * Changes the Arduino board profile if different from the currently set one.
 * @param {string} newBoard Name of the new profile to set.
 */
BotlyStudio.changeBlocklyArduinoBoard = function(newBoard) {
  if (Blockly.Arduino.Boards.selected !== Blockly.Arduino.Boards[newBoard]) {
    Blockly.Arduino.Boards.changeBoard(BotlyStudio.workspace, newBoard);
  }
};

/** Update the toolbox categories language. */
BotlyStudio.updateToolboxLanguage = function() {
  var categories = ['catLogic', 'catLoops', 'catMath', 'catText',
                    'catVariables', 'catFunctions', 'catInputOutput',
                    'catTime', 'catAudio', 'catMotors', 'catComms'];
  var categoryNodes = BotlyStudio.xmlTree.getElementsByTagName('category');
  for (var i = 0, cat; cat = categoryNodes[i]; i++) {
    var catId = cat.getAttribute('id');
    var catText = BotlyStudio.getLocalStr(catId);
    if (catText) {
      cat.setAttribute('name', catText);
    }
  }
};

/**
 * Adds a category to the current toolbox.
 * @param {!string} categoryTitle Toolbox category title.
 * @param {!Element} categoryDom Toolbox category to add add the end of tree.
 */
BotlyStudio.addToolboxCategory = function(categoryTitle, categoryDom) {
  categoryDom.id = 'cat' + categoryTitle.replace(/\s+/g, '');
  categoryDom.setAttribute('name', categoryTitle);
  BotlyStudio.xmlTree.appendChild(document.createElement('sep'));
  BotlyStudio.xmlTree.appendChild(categoryDom);
  BotlyStudio.workspace.updateToolbox(BotlyStudio.xmlTree);
};

/**
 * Removes a category to the current toolbox.
 * @param {!String} categoryTitle Toolbox category name to remove from tree.
 */
BotlyStudio.removeToolboxCategory = function(categoryTitle) {
  var categoryId = 'cat' + categoryTitle.replace(/\s+/g, '');
  var categoryNodes = BotlyStudio.xmlTree.getElementsByTagName('category');
  for (var i = 0; i < categoryNodes.length; i++) {
    if (categoryNodes[i].getAttribute('id') === categoryId) {
      var previousNode = categoryNodes[i].previousElementSibling;
      BotlyStudio.xmlTree.removeChild(categoryNodes[i]);
      if (previousNode && previousNode.nodeName == 'sep') {
        BotlyStudio.xmlTree.removeChild(previousNode);
      }
    }
  }
  BotlyStudio.workspace.updateToolbox(BotlyStudio.xmlTree);
};

/** Closes the toolbox block container sub-menu. */
BotlyStudio.blocklyCloseToolbox = function() {
  BotlyStudio.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
BotlyStudio.blocklyToolboxWidth = function() {
  return BotlyStudio.workspace.toolbox_.width;
};

/** @return {!boolean} Indicates if a block is currently being dragged. */
BotlyStudio.blocklyIsDragging = function() {
  return (Blockly.dragMode_ != 0) ? true : false;
};

/** Wraps the blockly 'cut' functionality. */
BotlyStudio.blocklyCut = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
    Blockly.selected.dispose(true, true);
  }
};

/** Wraps the blockly 'copy' functionality. */
BotlyStudio.blocklyCopy = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
  }
};

/** Wraps the blockly 'paste' functionality. */
BotlyStudio.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/** Wraps the blockly 'delete' functionality. */
BotlyStudio.blocklyDelete = function() {
  if (Blockly.selected && Blockly.selected.isDeletable()) {
    Blockly.hideChaff();
    Blockly.selected.dispose(true, true);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
BotlyStudio.ajaxRequest = function() {
  var request;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  } catch (e) {
    try {
      // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw 'Your browser does not support AJAX';
        request = null;
      }
    }
  }
  return request;
};
