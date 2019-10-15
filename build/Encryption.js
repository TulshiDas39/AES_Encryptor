"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var electron_1 = require("electron");
var FileManager_1 = require("./FileManager");
var MainApp_1 = require("./MainApp");
var path_1 = require("path");
var Encryption = /** @class */ (function () {
    function Encryption() {
        this.fileManager = new FileManager_1.FileManager();
        this.appPath = electron_1.app.getAppPath();
        this.init();
    }
    Encryption.prototype.init = function () {
        console.log('appPath:' + this.appPath);
        this.setEncyptEvent();
    };
    Encryption.prototype.setEncyptEvent = function () {
        var _this = this;
        electron_1.ipcMain.on('encrypt-file', function (event) {
            console.log('starting encryption');
            _this.encrypt();
        });
    };
    Encryption.prototype.encrypt = function () {
        var _this = this;
        var filePath = this.fileManager.getFilePath();
        console.log('starting encryption:' + filePath);
        //let data = this.fileManager.readFileContent(this.fileManager.getFilePath());
        console.log(this.fileManager.getFilePath());
        var executable = path_1.join(this.appPath, 'tools', 'enc.exe');
        console.log('executable:' + executable);
        child_process_1.execFile(executable, [filePath], function (err, stdout, stderr) {
            if (err) {
                console.log('err happened');
                console.log(err.message);
            }
            else if (stderr)
                console.log('stderr happened' + stderr);
            else {
                //console.log('stdout:' + stdout);
                FileManager_1.FileManager.data = _this.fileManager.readFileContent("encrypted.prt");
                var fileName = _this.fileManager.getDestinationPath();
                fileName = fileName.substring(fileName.lastIndexOf(path_1.sep) + 1);
                console.log(fileName);
                if (MainApp_1.MainApp.myWindow)
                    MainApp_1.MainApp.myWindow.webContents.send('encrypted', fileName);
            }
        });
    };
    return Encryption;
}());
exports.Encryption = Encryption;
