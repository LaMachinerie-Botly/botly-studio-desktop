'use strict';


/** Create a name space for the application. */
var BotlyStudioIPC = {};
const electron = require('electron')


const ipc = electron.ipcRenderer;


/**
 * Gets the current Compiler location from the BotlyStudioIPC settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
BotlyStudioIPC.requestCompilerLocation = function() {

};

/**
 * Request to the BotlyStudio Server to prompt the user for a new compiler 
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
BotlyStudioIPC.requestNewCompilerLocation = function() {

};

/**
 * Gets the current Sketch location from the BotlyStudio Server settings.
 * @param {!function} callback Callback function for the server request, must
 *                             one argument to receive the new location within
 *                             an HTML element of type input text.
 */
BotlyStudioIPC.requestSketchLocation = function() {

};

/**
 * Request to the BotlyStudio Server to prompt the user for a new sketch
 * location. Done by the Python server because a 'file browse' triggered by
 * the browser with JS will obscure the user information for security reasons.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new location
 *                             within an HTML element of type input text.
 */
BotlyStudioIPC.requestNewSketchLocation = function() {

};

/**
 * Request to the BotlyStudio Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.requestArduinoBoards = function() {

};

/**
 * Sends the inputted Arduino Board type to the BotlyStudio Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.setArduinoBoard = function(new_board) {

};

/**
 * Request to the BotlyStudio Server to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.requestSerialPorts = function() {

};

/**
 * Sends the inputted Serial Port to the BotlyStudio Server Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.setSerialPort = function(new_port) {

};

/**
 * Gets the current IDE setting from the BotlyStudio Server settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.requestIdeOptions = function() {

};

/**
 * Sends the inputted IDE option to the BotlyStudio Server Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option has been selected.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.setIdeOptions = function(ide_option) {

};


/**
 * Sends the Arduino code to the BotlyStudioIPC to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format.
 * @param {!function} callback Callback function for the server request, must
 *                             have one argument to receive the new setting as
 *                             an HTML select element.
 */
BotlyStudioIPC.sendSketchToServer = function(code) {
    ipc.send('code', code)
};
