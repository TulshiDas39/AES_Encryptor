import { execFile } from "child_process";
import { ipcMain } from "electron";
import { FileManager } from "./FileManager";
import { MainApp } from "./MainApp";
import { sep } from "path";

export class Encryption {

    private fileManager = new FileManager();
    constructor() {
        this.init();
    }

    private init() {
        this.setEncyptEvent();
    }

    private setEncyptEvent() {
        ipcMain.on('encrypt-file', (event: Event) => {
            console.log('starting encryption');
            this.encrypt();
        })
    }

    public encrypt() {
        let filePath:string = this.fileManager.getFilePath();
        console.log('starting encryption:' + filePath);
        //let data = this.fileManager.readFileContent(this.fileManager.getFilePath());
        
        console.log(this.fileManager.getFilePath());

        execFile('./tools/enc.exe', [filePath], (err: Error|null, stdout: string, stderr: string) => {
            if (err) {
                console.log('err happened');
                console.log(err.message);
            }
            else if (stderr) console.log('stderr happened'+stderr);
            else {
                //console.log('stdout:' + stdout);
                FileManager.data = this.fileManager.readFileContent("encrypted.prt");
                let fileName = this.fileManager.getDestinationPath();
                fileName = fileName.substring(fileName.lastIndexOf(sep)+1);
                console.log(fileName);
                if(MainApp.myWindow)MainApp.myWindow.webContents.send('encrypted',fileName);
            }
        });
    }

}