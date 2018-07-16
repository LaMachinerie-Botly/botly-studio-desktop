'use strict';


/** Create a name space for the application. */
var BotlyStudioIPC = {};
const electron = require('electron');


const ipc = electron.ipcRenderer;


BotlyStudioIPC.initIPC = function(){
    ipc.on('compiler-request-response', function(event, arg) {
        var compilerPath = JSON.parse(arg);
        BotlyStudio.setCompilerLocationHtml(compilerPath);
    });
    ipc.on('port-request-response', function(event, arg) {
        var serialList = JSON.parse(arg);
            // Drop down list of unknown length with a selected item
        var element = document.createElement('select');
        element.name = serialList.response_type;
        for (var i = 0; i < serialList.options.length; i++) {
            var option = document.createElement('option');
            option.value = serialList.options[i].value;
            option.text = serialList.options[i].display_text;
            // Check selected option and mark it
            if (serialList.options[i].value == serialList.selected) {
                option.selected = true;
            }
            element.appendChild(option);
        }
    });
}

/**
 * Gets the current Compiler location from the BotlyStudioIPC settings.
 */
BotlyStudioIPC.requestCompilerLocation = function() {
    ipc.send('compiler-request');
};

/**
 * Request to the BotlyStudio Server to prompt the user for a new compiler 
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 */
BotlyStudioIPC.setCompilerLocation = function() {
    var reader = new FileReader();
    reader.onload = function() {
        var result = reader.result;
        ipc.send('set-compiler', result)
    }
};



/**
 * Request to the BotlyStudio Server to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 */
BotlyStudioIPC.requestSerialPorts = function() {
    ipc.send('port-request');
};

/**
 * Sends the inputted Serial Port to the BotlyStudio Server Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 */
BotlyStudioIPC.setSerialPort = function(new_port) {
    ipc.send('set-port', new_port);
};


/**
 * Sends the Arduino code to the BotlyStudioIPC to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format.
 */
BotlyStudioIPC.sendSketchToServer = function(code) {
    ipc.send('code', code);
};
