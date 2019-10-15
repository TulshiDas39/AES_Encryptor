"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Encryption_1 = require("./Encryption");
var FileManager_1 = require("./FileManager");
var Decryption_1 = require("./Decryption");
var path_1 = require("path");
var MainApp = /** @class */ (function () {
    function MainApp() {
        this.fileManager = new FileManager_1.FileManager();
        this.init();
        new Encryption_1.Encryption();
        new Decryption_1.Decryption();
    }
    MainApp.prototype.init = function () {
        this.setAppEvents();
        this.setIpcEvents();
        this.setSaveFileEvent();
        this.handleException();
    };
    MainApp.prototype.handleException = function () {
        process.on('uncaughtException', function () {
            console.log('error happened');
        });
    };
    MainApp.prototype.setSaveFileEvent = function () {
        var _this = this;
        electron_1.ipcMain.on('save-file', function (event) {
            _this.fileManager.saveFile();
        });
    };
    MainApp.prototype.setAppEvents = function () {
        var _this = this;
        electron_1.app.on('ready', this.createWindow);
        electron_1.app.on('window-all-closed', function () {
            if (process.platform !== 'darwin')
                electron_1.app.quit();
        });
        electron_1.app.on('activate', function () {
            if (_this.mainWindow === null)
                _this.createWindow();
        });
    };
    MainApp.prototype.createWindow = function () {
        var _this = this;
        this.mainWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
        MainApp.myWindow = this.mainWindow;
        this.mainWindow.loadFile('index.html');
        this.mainWindow.on('closed', function () {
            _this.mainWindow = null;
        });
    };
    MainApp.prototype.setIpcEvents = function () {
        this.openPlainTextFileEvent();
    };
    MainApp.prototype.openPlainTextFileEvent = function () {
        var _this = this;
        electron_1.ipcMain.on('select-file', function (event) {
            console.log('select event');
            var filePaths = electron_1.dialog.showOpenDialog({ title: "select file", properties: ['openFile'] });
            console.log(filePaths);
            if (filePaths) {
                console.log('has come');
                _this.fileManager.setFilePath(filePaths[0]);
                console.log(_this.fileManager.getFilePath());
                if (MainApp.myWindow) {
                    var fileName = filePaths[0].substring(filePaths[0].lastIndexOf(path_1.sep) + 1);
                    console.log(fileName);
                    MainApp.myWindow.webContents.send('selected-file', fileName);
                }
                else {
                    console.log('main window doesnot exist');
                }
            }
        });
    };
    return MainApp;
}());
exports.MainApp = MainApp;
