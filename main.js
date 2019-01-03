//Ardublockly
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dataPath = app.getPath('documents') + "/Botly-Studio";

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


  Setting.createUserData();
  Setting.repairFile();
  initIpc();
}

function initIpc() {

  ipc.on('set-compiler', function (event) {
    const { dialog } = require('electron');

    compilerLocation = dialog.showOpenDialog({ properties: ['openFile'] });
    Setting.setCompiler(compilerLocation[0]);

    var jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
    event.sender.send('compiler-request-response', JSON.stringify(jsonResponse));
  });


  ipc.on('compiler-request', function (event) {
    var jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
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

  ipc.on('robot-request', function (event) {
    var jsonResponse = { element: "text_input", display_text: Setting.getRobot() };
    event.sender.send('robot-request-response', JSON.stringify(jsonResponse));
  });

  ipc.on('set-robot', function (event, robot) {
    Setting.setRobot(robot);

    var jsonResponse = { element: "text_input", display_text: Setting.getRobot() };
    event.sender.send('robot-request-response', JSON.stringify(jsonResponse));
  });

  ipc.on('code', function (event, arg) {
    var fs = require('fs');
    try { fs.writeFileSync(dataPath + '/sketch/sketch.ino', arg, 'utf-8'); }
    catch (e) { console.log('Failed to save the file !'); }
  });



  ipc.on('compile', function (event, method) {
    if (fs.existsSync(dataPath + "/sketch/sketch.ino")) {
      Builder.compile(event, method);
    }
  });


  ipc.on('flash', function (event) {
    if (fs.existsSync(dataPath + "/build/sketch.ino.hex")) {
      Builder.flash(event);
    }
  });


  ipc.on('openIDE', function (event) {
    if (fs.existsSync(dataPath + "/sketch/sketch.ino")) {
      Builder.open();
    }
  });
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
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

Setting.setRobot = function (robot) {
  var jsonSetting = Setting.readSetting();
  if (robot != null) {
    jsonSetting.robot = robot;
    Setting.saveSetting(jsonSetting);
  } else {
    return false;
  }
  return true;
}

Setting.getRobot = function () {
  console.log(this.readSetting().robot);
  return Setting.readSetting().robot;
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
  out = Setting.readSetting().serialport;
  if(out == null || out == ""){
    
  }
  return out;
}

Setting.createUserData =function(){
  var directory = dataPath;
  Setting.checkDirectorySync( directory);
  Setting.checkDirectorySync( directory + "/build");
  Setting.checkDirectorySync( directory + "/sketch");
}

Setting.checkDirectorySync = function(directory){
  fs =  require('fs');
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

Setting.repairFile = function () {
  Setting.saveSetting(Setting.readSetting());
}

Setting.readSetting = function () {
  fs = require('fs');
  spath = dataPath + "/setting.json";
  content = "";
  try{
    content = fs.readFileSync(spath, 'utf-8')
  }catch(e){
    content = '{ "compiler": "", "serialport": "", "robot": "Botly" }';
  }
  json = Setting.parseToJson(content);
  return json;
}

Setting.saveSetting = function (jsonSetting) {
  fs = require('fs');
  spath = dataPath + "/setting.json";
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
    jsonSetting = { compiler: "", serialport: "", robot: "Botly" };
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
const executablePath = app.getAppPath() + "/builder/arduino-builder.exe";


Builder.compile = function (event, method) {
  compilerPath = executablePath;
  var method = method;
  
  
  if(Setting.getRobot() == "2") compilerFlag = "avr:uno"
  else compilerFlag = "avr:LilyPadUSB"

  var basepath = app.getAppPath();
  var child = require('child_process').execFile;
  var parameters = ["-compile",
    "-verbose=false",
    "-hardware=" + basepath + "/builder/hardware",
    "-build-path=" + dataPath + "/build",
    "-tools=" + basepath + "/builder/hardware/tools/avr",
    "-tools=" + basepath + "/builder/tools-builder",
    "-libraries=" + basepath + "/builder/libraries",
    "-fqbn=arduino:" + compilerFlag,
    "" + dataPath + "/sketch/sketch.ino"];

  child(compilerPath, parameters, function (err, data) {
    console.log(err)
    //console.log(data.toString());
    var jsonResponse = {};
    if (err) {
      jsonResponse = { "element": "div_ide_output", "output": err.toString() , "success": "false", "method": method };
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

    var child = require('child_process').execFile;
    var parameters = [dataPath + "/sketch/sketch.ino"];

    child(compilerPath, parameters, function (err, data) {
      console.log(err)
      console.log(data.toString());
    });
  }
}



Builder.flash = function (event) {
  var Avrgirl = require('avrgirl-arduino');
  var boardName = "lilypad-usb";
  if(Setting.getRobot() == 2) var boardName = "uno"
  try{
    var avrgirl = new Avrgirl({
      board: boardName,
      port: Setting.getSerialPort(),
      debug: true
    });
  
    avrgirl.flash(dataPath + '/build/sketch.ino.hex', function (error) {
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
  }catch(e){
    console.log(e);
    jsonResponse = {};
    jsonResponse = { "element": "div_ide_output", "output": error, "success": "false" };
    event.sender.send('upload-response', JSON.stringify(jsonResponse));
  }
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
	  console.log(port);
      if (Setting.getSerialPort() == port.comName) {
        autoselect = port.comName;
        serial.push({ "value": port.comName, "display_text": port.comName });
      } else if (autoselect == null && (port.manufacturer == "SparkFun" || port.productId == "9208") && Setting.getRobot() == 1 || 
                  autoselect == null && (port.manufacturer == "FTDI" || port.productId == "6001") && Setting.getRobot() == 2) {
        autoselect = port.comName;
        serial.push({ "value": port.comName, "display_text": port.comName + ((Setting.getRobot() == 1) ? " Botly" : " Scott") });
      } else {
        serial.push({ "value": port.comName, "display_text": port.comName });
      }

    });
    result = { 'autoselect': autoselect, 'ports': serial };
    if(autoselect != null) Setting.setSerialPort(autoselect);
    return callback(Serial.parseResponse(result));
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
    jsonResponse.selected = "Pas de port série"
    jsonResponse.options = [{ display_text: "Pas de port série", value: "NONE" }];
  }
  return jsonResponse;
}