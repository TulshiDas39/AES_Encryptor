"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var electron_1 = require("electron");
var Status;
(function (Status) {
    Status[Status["encryption"] = 0] = "encryption";
    Status[Status["decryption"] = 1] = "decryption";
    Status[Status["none"] = 2] = "none";
})(Status = exports.Status || (exports.Status = {}));
;
var FileManager = /** @class */ (function () {
    function FileManager() {
        this.init();
    }
    FileManager.prototype.init = function () {
        //this.setSaveFileEvent();
    };
    // private setSaveFileEvent() {
    //     ipcMain.on('save-file',(event:any)=>{
    //         this.saveFile();
    //     })
    // }
    FileManager.prototype.readFileContent = function (filePath) {
        return fs_1.readFileSync(filePath, 'utf8');
    };
    FileManager.prototype.getFilePath = function () {
        return FileManager.filePath;
    };
    FileManager.prototype.setFilePath = function (path) {
        FileManager.filePath = path;
        if (path.substring(path.lastIndexOf('.')) === '.prt')
            FileManager.status = Status.decryption;
        else
            FileManager.status = Status.encryption;
    };
    FileManager.prototype.getDestinationPath = function () {
        var extention = "";
        if (FileManager.status == Status.encryption)
            extention = '.prt';
        else
            extention = '.txt';
        var filename = FileManager.filePath.substring(FileManager.filePath.lastIndexOf(path_1.sep) + 1);
        var destinationDir = FileManager.filePath.substring(0, FileManager.filePath.lastIndexOf(path_1.sep) + 1);
        var newFileName = filename.substr(0, filename.lastIndexOf('.'));
        newFileName += extention;
        return path_1.join(destinationDir, newFileName);
    };
    FileManager.prototype.saveFile = function () {
        var _this = this;
        var options = {
            defaultPath: this.getDestinationPath()
        };
        electron_1.dialog.showSaveDialog(null, options, function (path) {
            if (path) {
                console.log(path);
                _this.writeFile(path, FileManager.data);
            }
        });
    };
    FileManager.prototype.writeFile = function (filePath, data) {
        console.log('writing to file');
        fs_1.writeFileSync(filePath, data, { encoding: 'utf8' });
        // var stream = createWriteStream(filePath, {flags: 'w'});
        // stream.write(data);
    };
    FileManager.prototype.getEncryptedFileName = function () {
        this.getDestinationPath().substring(this.getDestinationPath().lastIndexOf(path_1.sep) + 1);
    };
    FileManager.status = Status.none;
    return FileManager;
}());
exports.FileManager = FileManager;
