'use strict';


/** Create a name space for the application. */
var BotlyStudioIPC = {};
const electron = require('electron');


const ipc = electron.ipcRenderer;


BotlyStudioIPC.initIPC = function(){
    ipc.on('compiler-request-response', function(event, arg) {
        
    });
    ipc.on('sketch-request-response', function(event, arg) {
        
    });
    ipc.on('board-request-response', function(event, arg) {

    });
    ipc.on('port-request-response', function(event, arg) {

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

    }
};

/**
 * Gets the current Sketch location from the BotlyStudio Server settings.
 */
BotlyStudioIPC.requestSketchLocation = function() {
    ipc.send('sketch-request');
};

/**
 * Request to the BotlyStudio Server to prompt the user for a new sketch
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 */
BotlyStudioIPC.setSketchLocation = function() {

};

/**
 * Request to the BotlyStudio Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 */
BotlyStudioIPC.requestArduinoBoards = function() {
    ipc.send('board-request');
};

/**
 * Sends the inputted Arduino Board type to the BotlyStudio Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 */
BotlyStudioIPC.setArduinoBoard = function(new_board) {
    ipc.send('set-board', new_board);
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
