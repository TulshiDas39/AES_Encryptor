"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Index = /** @class */ (function () {
    function Index() {
        this.fileOpener = document.getElementById('selection');
        this.fileSaver = document.getElementById('save');
        this.encryptBtn = document.getElementById('encrypt');
        this.decryptBtn = document.getElementById('decrypt');
        this.encrypted = false;
        this.init();
    }
    Index.prototype.init = function () {
        this.setFilefileOpenEvent();
        this.saveFile();
        this.fileSelectionEvent();
        this.setEncryptionEvent();
        this.setDecryptionEvent();
        this.setEncryptedEvent();
        this.setDecryptedEvent();
    };
    Index.prototype.setDecryptedEvent = function () {
        electron_1.ipcRenderer.on('decrypted', function (event, fileName) {
            document.getElementById('save').style.display = 'inline';
            document.getElementById('result-file').style.display = 'inline';
            document.getElementById('result-file').innerHTML = fileName;
        });
    };
    Index.prototype.setEncryptedEvent = function () {
        electron_1.ipcRenderer.on('encrypted', function (event, fileName) {
            document.getElementById('save').style.display = 'inline';
            document.getElementById('result-file').style.display = 'inline';
            document.getElementById('result-file').innerHTML = fileName;
        });
    };
    Index.prototype.setDecryptionEvent = function () {
        this.decryptBtn.onclick = function () {
            console.log('decryptbtn clicked');
            electron_1.ipcRenderer.send('decrypt-file');
        };
    };
    Index.prototype.setEncryptionEvent = function () {
        this.encryptBtn.onclick = function () {
            console.log('starting encrypting');
            electron_1.ipcRenderer.send('encrypt-file');
        };
    };
    Index.prototype.fileSelectionEvent = function () {
        var _this = this;
        electron_1.ipcRenderer.on('selected-file', function (event, fileName) {
            //this.selectedFilePath = path;
            console.log('ipcRenderer file selected');
            console.log(fileName);
            document.getElementById('selected-file').innerHTML = fileName;
            _this.toogleDisplay('inline', 'action-btn');
        });
    };
    Index.prototype.setFilefileOpenEvent = function () {
        console.log('file opener clicked');
        this.fileOpener.onclick = function () {
            electron_1.ipcRenderer.send('select-file');
        };
    };
    Index.prototype.saveFile = function () {
        console.log('file save clicked');
        this.fileSaver.onclick = function () {
            electron_1.ipcRenderer.send('save-file');
        };
    };
    Index.prototype.toogleDisplay = function (displayVal, className) {
        var all = document.getElementsByClassName(className);
        for (var i = 0; i < all.length; i++) {
            all[i].style.display = displayVal;
        }
    };
    return Index;
}());
new Index();
