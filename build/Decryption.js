"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var FileManager_1 = require("./FileManager");
var electron_1 = require("electron");
var MainApp_1 = require("./MainApp");
var path_1 = require("path");
var Decryption = /** @class */ (function () {
    function Decryption() {
        this.fileManager = new FileManager_1.FileManager();
        this.appPath = electron_1.app.getAppPath();
        this.init();
    }
    Decryption.prototype.init = function () {
        this.setDecryptEvent();
    };
    Decryption.prototype.setDecryptEvent = function () {
        var _this = this;
        electron_1.ipcMain.on('decrypt-file', function (event) {
            console.log('decrypting file');
            _this.decrypt();
        });
    };
    Decryption.prototype.decrypt = function () {
        var _this = this;
        var filePath = this.fileManager.getFilePath();
        //let data = this.fileManager.readFileContent(filePath);
        //console.log('encrypted data:'+data);
        var executable = path_1.join(this.appPath, 'tools', 'dec.exe');
        console.log('executable:' + executable);
        child_process_1.execFile(executable, [filePath], function (err, stdout, stderr) {
            if (err) {
                console.log('err happened');
                console.log(err.message);
            }
            else if (stderr)
                console.log('stderr happened' + stderr);
            else {
                //FileManager.data= stdout.replace(/\r\n/g,"\n");
                FileManager_1.FileManager.data = _this.fileManager.readFileContent("decrypted.txt");
                // console.log('stdout:' + stdout);
                var fileName = _this.fileManager.getDestinationPath();
                fileName = fileName.substring(fileName.lastIndexOf(path_1.sep) + 1);
                console.log(fileName);
                if (MainApp_1.MainApp.myWindow)
                    MainApp_1.MainApp.myWindow.webContents.send('decrypted', fileName);
            }
        });
    };
    return Decryption;
}());
exports.Decryption = Decryption;
