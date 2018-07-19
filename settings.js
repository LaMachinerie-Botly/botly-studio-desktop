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