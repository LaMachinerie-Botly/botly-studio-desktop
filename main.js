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
  initIpc();
}

function initIpc() {



  ipc.on('set-compiler', function (event) {
    const { dialog } = require('electron');
    compilerLocation = dialog.showOpenDialog({ properties: ['openFile'] });
    Setting.setCompiler(compilerLocation[0]);
  });



  ipc.on('compiler-request', function (event) {
    event.sender.send('compiler-request-response', Setting.getCompiler());
  });



  ipc.on('serial-port-request', function (event) {
    var portList = Serial.getPorts();
    var jsonResponse = {
      "selected": "",
      "element": "dropdown",
      "response_type": "json",
      "options": portList.ports
    };

    if (portList.autoselect != null) {
      jsonResponse.selected = autoselect;
      for (var i = 0; i < jsonResponse.options.length; i++) {
        if (jsonResponse.selected == jsonResponse.options[i].value) {
          jsonResponse.options[i].display_text = jsonResponse.options[i].value + ' (Botly robot)'
        }
      }
    }
    else if (jsonResponse.options[0] != null) jsonResponse.selected = jsonResponse.options[0].display_text;
    else jsonResponse.selected = "No Serial port"

    console.log(jsonResponse);
    event.sender.send('serial-port-request-response', JSON.stringify(jsonResponse));
  });



  ipc.on('set-serial-port', function (event, port) {
    Setting.setSerialPort(port);
  });



  ipc.on('code', function (event, arg) {
    var fs = require('fs');
    try { fs.writeFileSync(app.getAppPath() + '/builder/sketch/sketch.ino', arg, 'utf-8'); }
    catch (e) { console.log('Failed to save the file !'); }
  });



  ipc.on('compile', function (event) {
    if (fs.existsSync(root + "/builder/sketch/sketch.ino")) {
      Buidler.compile();
    }
  });


  ipc.on('flash', function (event) {
    if (fs.existsSync(root + "/builder/build/sketch.ino.hex")) {
      Buidler.flash();
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
    fs = require('fs');
    var jsonSetting = Setting.readSetting();
    if (compiler != null) {
        jsonSetting.compiler = compiler;
        Setting.saveSetting(jsonSetting);
    }else{
        return false;
    }
    return true;
}

Setting.getCompiler = function () {
    return Setting.readSetting().compiler;
}

Setting.setSerialPort = function (port) {
    fs = require('fs');
    var jsonSetting = Setting.readSetting();
    if (port != null) {
        jsonSetting.port = port;
        Setting.saveSetting(jsonSetting);
    }else{
        return false;
    }
    return true;
}

Setting.getSerialPort = function () {
    return Setting.readSetting().port;
}

Setting.repairFile = function () {
    Setting.saveSetting(Setting.readSetting());
}

Setting.readSetting = function () {
    path = app.getAppPath() + '/settings.json';
    try {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                console.log("An error ocurred reading the file :" + err.message);
                return;
            } else return Setting.parseToJson(data);
        });
    } catch (e) {
        console.log(e);
    }
}

Setting.saveSetting = function(jsonSetting){
    path = app.getAppPath() + '/settings.json';
    setting = JSON.stringify(jsonSetting, undefined, 2);
    fs.writeFile(path, setting, (err) => {
        if (err) {
            console.log("An error ocurred creating the file " + err.message)
            return false;
        }
        return true;
    });
}

Setting.parseToJson = function (str) {
    jsonSetting = null;
    try { jsonSetting = JSON.parse(fileContent); } catch (e) { console.log(e); }
    if (jsonSetting == null) {
        jsonSetting = { "compiler": "Default", "serialport": "" };
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


Builder.compile = function () {
    compiler = Setting.getCompiler();
    compilerPath = "";
    if (compiler != "Default") compilerPath = compiler;
    else compilerPath = executablePath;

    var basepath = app.getAppPath();
    var child = require('child_process').execFile;
    var parameters = ["-compile",
      "-verbose=false",
      "-hardware=" + basepath + "/builder/hardware",
      "-build-path=" + basepath + "/builder/sketch/build",
      "-tools=" + basepath + "/builder/hardware/tools/avr",
      "-tools=" + basepath + "/builder/tools-builder",
      "-libraries=" + basepath + "/builder/libraries",
      "-fqbn=arduino:avr:LilyPadUSB",
      "" + basepath + "/builder/sketch/sketch.ino"];

    child(executablePath, parameters, function (err, data) {
      console.log(err)
      console.log(data.toString());
    });
}




Builder.flash = function () {
    var Avrgirl = require('avrgirl-arduino');
    var avrgirl = new Avrgirl({
      board: 'lilypad-usb',
      port: jsonSetting.serialport
    });

    avrgirl.flash(root + '/builder/build/sketch.ino.hex', function (error) {
      jsonResponse = { "element": "div_ide_output", "display_text": data.toString() };
      if (error) {
        console.error(error);
      } else {
        console.info('done.');
      }
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


Serial.getPorts = function(){
    var SerialPort = require('serialport');
    var autoselect = null;
    var ports = [];

    SerialPort.list(function (err, ports) {
        ports.forEach(function (port) {
          if (port.manufacturer == "Arduino LLC (www.arduino.cc)" || port.productId == "1B4F") {
            autoselect = port.comName;
          }
          ports.push({ "value": port.comName, "display_text": port.comName});
        });
    });

    result = {'autoselect': autoselect, 'ports': ports};
    console.log(result);
    return ports;
}


