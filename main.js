//Ardublockly
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


require('./settings');

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

