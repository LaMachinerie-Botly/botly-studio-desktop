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

