//Ardublockly
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const root = app.getAppPath();


let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1280, height: 720, frame: true });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })


  Setting.repairFile();
  initIpc();
}

function initIpc() {

  ipc.on('set-compiler', function (event) {
    const { dialog } = require('electron');

    compilerLocation = dialog.showOpenDialog({ properties: ['openFile'] });
    Setting.setCompiler(compilerLocation[0]);

    jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
    event.sender.send('compiler-request-response', JSON.stringify(jsonResponse));
  });


  ipc.on('compiler-request', function (event) {
    jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
    event.sender.send('compiler-request-response', JSON.stringify(jsonResponse));
  });



  ipc.on('serial-port-request', function (event) {
    callback = function (jsonResponse) {
      event.sender.send('serial-port-request-response', JSON.stringify(jsonResponse));
    }
    Serial.getPorts(callback);
  });



  ipc.on('set-serial-port', function (event, port) {
    Setting.setSerialPort(port);
    callback = function (jsonResponse) {
      event.sender.send('serial-port-request-response', JSON.stringify(jsonResponse));
    }
    Serial.getPorts(callback);
  });



  ipc.on('code', function (event, arg) {
    var fs = require('fs');
    try { fs.writeFileSync(app.getAppPath() + '/builder/sketch/sketch.ino', arg, 'utf-8'); }
    catch (e) { console.log('Failed to save the file !'); }
  });



  ipc.on('compile', function (event, method) {
    if (fs.existsSync(app.getAppPath() + "/builder/sketch/sketch.ino")) {
      Builder.compile(event, method);
    }
  });


  ipc.on('flash', function (event) {
    if (fs.existsSync(app.getAppPath() + "/builder/build/sketch.ino.hex")) {
      Builder.flash(event);
    }
  });


  ipc.on('openIDE', function (event) {
    if (fs.existsSync(app.getAppPath() + "/builder/sketch/sketch.ino")) {
      Builder.open();
    }
  });
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


/************************************************
*
*
*					Setting
*
*
*
*************************************************
*/


var Setting = {};

Setting.setCompiler = function (compiler) {
  var jsonSetting = Setting.readSetting();
  if (compiler != null) {
    jsonSetting.compiler = compiler;
    Setting.saveSetting(jsonSetting);
  } else {
    return false;
  }
  return true;
}

Setting.getCompiler = function () {
  return Setting.readSetting().compiler;
}

Setting.setSerialPort = function (port) {
  jsonSetting = Setting.readSetting();
  if (port != null) {
    jsonSetting.serialport = port;
    Setting.saveSetting(jsonSetting);
  } else {
    return false;
  }
  return true;
}

Setting.getSerialPort = function () {
  return Setting.readSetting().serialport;
}



Setting.repairFile = function () {
  Setting.saveSetting(Setting.readSetting());
}

Setting.readSetting = function () {
  fs = require('fs');
  spath = app.getAppPath() + "/setting.json";
  content = fs.readFileSync(spath, 'utf-8')
  json = Setting.parseToJson(content);
  return json;
}

Setting.saveSetting = function (jsonSetting) {
  fs = require('fs');
  spath = app.getAppPath() + "/setting.json";
  setting = JSON.stringify(jsonSetting, undefined, 2);
  fs.writeFileSync(spath, setting);
}

Setting.parseToJson = function (data) {
  jsonSetting = null;
  try { jsonSetting = JSON.parse(data); }
  catch (e) {
    console.log(e);
  }
  if (jsonSetting == null) {
    jsonSetting = { compiler: "Default", serialport: "" };
  }
  return jsonSetting;
}



/************************************************
*
*
*					Builder
*
*
*
*************************************************
*/

var Builder = {};
const executablePath = app.getAppPath() + "/builder/arduino-builder";


Builder.compile = function (event, method) {
  compilerPath = executablePath;
  var method = method;

  var basepath = app.getAppPath();
  var child = require('child_process').execFile;
  var parameters = ["-compile",
    "-verbose=false",
    "-hardware=" + basepath + "/builder/hardware",
    "-build-path=" + basepath + "/builder/build",
    "-tools=" + basepath + "/builder/hardware/tools/avr",
    "-tools=" + basepath + "/builder/tools-builder",
    "-libraries=" + basepath + "/builder/libraries",
    "-fqbn=arduino:avr:LilyPadUSB",
    "" + basepath + "/builder/sketch/sketch.ino"];

  child(compilerPath, parameters, function (err, data) {
    console.log(err)
    console.log(data.toString());
    jsonResponse = {};
    if (err) {
      jsonResponse = { "element": "div_ide_output", "output": err, "success": "false", "method": method };
    } else {
      jsonResponse = { "element": "div_ide_output", "output": data.toString(), "success": "true", "method": method };
    }
    //console.log(jsonResponse);
    event.sender.send('compile-response', JSON.stringify(jsonResponse));
  });
}

Builder.open = function () {
  compiler = Setting.getCompiler();
  compilerPath = "";
  if (compiler != "Default") {
    compilerPath = compiler;

    var basepath = app.getAppPath();
    var child = require('child_process').execFile;
    var parameters = [basepath + "/builder/sketch/sketch.ino"];

    child(compilerPath, parameters, function (err, data) {
      console.log(err)
      console.log(data.toString());
    });
  }
}



Builder.flash = function (event) {
  var Avrgirl = require('avrgirl-arduino');
  var avrgirl = new Avrgirl({
    board: 'lilypad-usb',
    port: Setting.getSerialPort(),
    debug: true
  });

  avrgirl.flash(app.getAppPath() + '/builder/build/sketch.ino.hex', function (error) {
    jsonResponse = {};
    if (error) {
      console.error(error);
      jsonResponse = { "element": "div_ide_output", "output": error, "success": "false" };
    } else {
      console.info('done.');
      jsonResponse = { "element": "div_ide_output", "output": "Téléversement terminé", "success": "true" };
    }
    event.sender.send('upload-response', JSON.stringify(jsonResponse));
  });
}

/************************************************
*
*
*					Serial
*
*
*
*************************************************
*/


var Serial = {};


Serial.getPorts = function (callback) {
  SerialPort = require('serialport');
  autoselect = null;
  serial = [];

  SerialPort.list(function (err, ports) {
    ports.forEach(function (port) {
      if (Setting.getSerialPort() == port.comName) {
        autoselect = port.comName;
        serial.push({ "value": port.comName, "display_text": port.comName });
      } else if (autoselect == null && (port.manufacturer == "Arduino LLC (www.arduino.cc)" || port.productId == "1B4F")) {
        autoselect = port.comName;
        serial.push({ "value": port.comName, "display_text": port.comName + ' (Botly robot)' });
      } else {
        serial.push({ "value": port.comName, "display_text": port.comName });
      }

    });
    result = { 'autoselect': autoselect, 'ports': serial };
    callback(Serial.parseResponse(result));
  });
}

Serial.parseResponse = function (portList) {
  //console.log("Port:");
  //console.log(portList.ports);
  jsonResponse = {
    "selected": "",
    "element": "dropdown",
    "response_type": "json",
    "options": portList.ports
  };

  if (portList.autoselect != null) {
    jsonResponse.selected = portList.autoselect;
  } else if (portList.ports.length > 0) {
    jsonResponse.selected = portList.ports[0].value;
    //jsonResponse.options = [{ display_text: portList.ports[0].value, value: portList.ports[0].value }];
  } else {
    jsonResponse.selected = "No Serial port"
    jsonResponse.options = [{ display_text: "No serial port", value: "" }];
  }
  return jsonResponse;
}