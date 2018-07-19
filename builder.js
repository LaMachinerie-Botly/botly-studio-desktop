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




Buidler.flash = function () {
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