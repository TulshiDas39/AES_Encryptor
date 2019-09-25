import { execFile } from "child_process";
import { FileManager } from "./FileManager";
import { ipcMain } from "electron";
import { MainApp } from "./MainApp";
import { sep } from "path";

export class Decryption{

    private fileManager = new FileManager();
    constructor(){
        this.init();
    }

    private init(){
        this.setDecryptEvent();
    }

    private setDecryptEvent(){
        ipcMain.on('decrypt-file',(event:any)=>{
            console.log('decrypting file');
            this.decrypt();
        })
    }

    private decrypt(){
        let data = this.fileManager.readFileContent(this.fileManager.getFilePath());

        execFile('./tools/dec.exe', [data], (err: any, stdout: string, stderr: string) => {
            if (err) {
                console.log('err happened');
                console.log(err);
            }
            else if (stderr) console.log('stderr happened');
            else {
                FileManager.data= stdout.replace(/\r\n/g,"\n");
                console.log('stdout:' + stdout);

                let fileName = this.fileManager.getDestinationPath();
                fileName = fileName.substring(fileName.lastIndexOf(sep)+1);
                console.log(fileName);
                if(MainApp.myWindow)MainApp.myWindow.webContents.send('decrypted',fileName);
            }
        });
    }
}