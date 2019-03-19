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
let serialWidget;
let updateWidget;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ show: false, width: 1280, height: 720, frame: true, backgroundColor: '#2e2c29'});
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
    if(serialWidget != undefined)
      serialWidget.close();
    serialWidget = null;
    if(updateWidget != undefined)
      updateWidget.close();
    updateWidget = null;
  })

  //openSerial();

  Setting.createUserData();
  Setting.repairFile();
  initIpc();
}


function openSerial(){
  // Create the browser window.
  serialWidget = new BrowserWindow({ width: 720, height: 380, frame: true});

  // and load the index.html of the app.
  serialWidget.loadURL(url.format({
    pathname: path.join(__dirname, 'serial/serial.html'),
    protocol: 'file:',
    slashes: true
  }))

  serialWidget.on('closed', function () {
    serialWidget = null
  })
    
}

function openUpdate(){
  // Create the browser window.
  updateWidget = new BrowserWindow({ width: 720, height: 380, frame: true});

  // and load the index.html of the app.
  updateWidget.loadURL(url.format({
    pathname: path.join(__dirname, 'serial/serial.html'),
    protocol: 'file:',
    slashes: true
  }))

  updateWidget.on('closed', function () {
    updateWidget = null
  })
}

function initIpc() {

  ipc.on('set-compiler', function (event) {
    const { dialog } = require('electron');

    compilerLocation = dialog.showOpenDialog({ properties: ['openFile'] });
    Setting.setCompiler(compilerLocation[0]);

    var jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
    event.sender.send('compiler-request-response', JSON.stringify(jsonResponse));
  });

  ipc.on('open-serial', function (event) {
    openSerial();
  });

  ipc.on('compiler-request', function (event) {
    var jsonResponse = { element: "text_input", display_text: Setting.getCompiler() };
    event.sender.send('compiler-request-response', JSON.stringify(jsonResponse));
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
    content = '{ "compiler": "", "robot": "Botly" }';
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
    jsonSetting = { compiler: "", robot: "Botly" };
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
