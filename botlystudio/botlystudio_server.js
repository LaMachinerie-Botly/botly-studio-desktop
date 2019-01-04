/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the BotlyStudio Server python program.
 */
'use strict';

/** Create a name space for the application. */
var BotlyStudioServer = {};

/**
 * Sends Form data to the ArduBlocklyServer using Ajax.
 * @param {!string} url Requestor URL.
 * @param {!string} params Form parameters in the 'var=x&var2=y' format.
 * @param {!function} callback Request callback function.
 */
BotlyStudioServer.ajaxPostForm = function(url, params, callback) {
  var request = BotlyStudioServer.createAjaxRequest();
  try {
    request.open('POST', url, true);
    request.setRequestHeader(
        'Content-type', 'application/x-www-form-urlencoded');
  } catch (e) {
    // The request will fail if opening the html directly on a browser, so
    // let's just send the callback nullified and the front end will deal.
    callback(null);
  }

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText);
      } else if (request.status == 405) {
        // return a null element which will be dealt with in the front end
        callback(null);
      }
    }
  };

  // Send the data
  try {
    request.send(params);
  } catch (e) {
    // Nullify callback to indicate error
    callback(null);
  }
};

/**
 * Sends plain data to the ArduBlocklyServer using Ajax.
 * @param {!string} url Requester URL.
 * @param {!string} data Plain text currently used to send Arduino code only.
 * @param {!function} callback Request callback function.
 */
BotlyStudioServer.ajaxPostPlain = function(url, data, callback) {
  var request = BotlyStudioServer.createAjaxRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'text/plain');

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        callback(request.responseText);
      } else if (request.status == 405) {
        // return a null element which will be dealt with in the front end
        callback(null);
      }
    }
  };

  // Send the data
  try {
    request.send(data);
  } catch (e) {
    // The request will fail if opening the html directly on a browser, so
    // let's just send the callback nullified and the front end will deal.
    callback(null);
  }
};

/**
 * Reads JSON data from the server and forwards formatted JavaScript object.
 * @param {!string} fileLocation Location for the JSON data.
 * @param {!function} jsonDataCb Callback with JSON object or null for error.
 */
BotlyStudio.getJsonData = function(fileLocation, jsonDataCb) {
  var request = BotlyStudioServer.createAjaxRequest();
  request.overrideMimeType("application/json");
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var jsonObj = null;
        try {
          jsonObj = JSON.parse(request.responseText);
        } catch(e) {
          console.error('Incorrectly formatted JSON data from ' + fileLocation);
          throw e;
        }
        jsonDataCb(jsonObj);
      } else {
        jsonDataCb(null);
      }
    }
  };
  try {
    request.open('GET', fileLocation, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    jsonDataCb(null);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
BotlyStudioServer.createAjaxRequest = function() {
  var request = false;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6 and earlier
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch (e) {
        throw 'Your browser does not support AJAX. You will not be able to' +
              'use all of BotlyStudio features.';
        request = null;
      }
    }
  }
  return request;
};

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {!element} An HTML element, which type depends on the JSON 'element'
 *                    key (currently only text input or drop down).
 */
BotlyStudioServer.createElementFromJson = function(json_data) {
  var parsed_json = JSON.parse(json_data);
  var element = null;

  if (parsed_json.element == 'text_input') {
    // Simple text input
    element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.setAttribute('value', parsed_json.display_text);
  } else if (parsed_json.element == 'dropdown') {
    // Drop down list of unknown length with a selected item
    element = document.createElement('select');
    element.name = parsed_json.response_type;
    for (var i = 0; i < parsed_json.options.length; i++) {
      var option = document.createElement('option');
      option.value = parsed_json.options[i].value;
      option.text = parsed_json.options[i].display_text;
      // Check selected option and mark it
      if (parsed_json.options[i].value == parsed_json.selected) {
        option.selected = true;
      }
      element.appendChild(option);
    }
  } else if (parsed_json.element == 'div_ide_output') {
    // Formatted text for the Arduino IDE CLI output
    var el_title = document.createElement('h4');
    el_title.innerHTML = BotlyStudio.getLocalStr(parsed_json.conclusion);
    if (parsed_json.success == true) {
      el_title.className = 'arduino_dialog_success';
    } else {
      el_title.className = 'arduino_dialog_failure';
    }

    var el_out = document.createElement('span');
    el_out.className = 'arduino_dialog_out';
    // If larger than 50 characters then don't bother looking for language key
    if (parsed_json.output.length < 50) {
      el_out.innerHTML = BotlyStudio.getLocalStr(parsed_json.output) ||
                         parsed_json.output.split('\n').join('<br />');
    } else {
      el_out.innerHTML = parsed_json.output.split('\n').join('<br />');
    }

    element = document.createElement('div');
    element.appendChild(el_title);
    element.appendChild(el_out);

    // Only ouput error message if it was not successful
    if (parsed_json.success == false) {
      var el_err = document.createElement('span');
      el_err.className = 'arduino_dialog_out_error';
      // If larger than 50 characters then don't bother looking for language key
      if (parsed_json.output.length < 50) {
        el_err.innerHTML = BotlyStudio.getLocalStr(parsed_json.error_output) ||
                           parsed_json.error_output.split('\n').join('<br />');
      } else {
        el_err.innerHTML = parsed_json.error_output.split('\n').join('<br />');
      }
      element.appendChild(el_err);
    }
  } else {
    //TODO: Not recognised, alert the user/developer somehow
  }

  return element;
};
