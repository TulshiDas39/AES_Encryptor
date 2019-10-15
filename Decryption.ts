import { execFile } from "child_process";
import { FileManager } from "./FileManager";
import { ipcMain, app } from "electron";
import { MainApp } from "./MainApp";
import { sep, join } from "path";

export class Decryption{

    private fileManager = new FileManager();
    private appPath = app.getAppPath();
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
        let filePath = this.fileManager.getFilePath();
        //let data = this.fileManager.readFileContent(filePath);
        //console.log('encrypted data:'+data);

        let executable = join(this.appPath,'tools','dec.exe');
        console.log('executable:'+executable);

        execFile(executable, [filePath], (err:Error|null, stdout: string, stderr: string) => {
            if (err) {
                console.log('err happened');
                console.log(err.message);
            }
            else if (stderr) console.log('stderr happened'+stderr);
            else {
                //FileManager.data= stdout.replace(/\r\n/g,"\n");
                FileManager.data = this.fileManager.readFileContent("decrypted.txt");
               // console.log('stdout:' + stdout);

                let fileName = this.fileManager.getDestinationPath();
                fileName = fileName.substring(fileName.lastIndexOf(sep)+1);
                console.log(fileName);
                if(MainApp.myWindow)MainApp.myWindow.webContents.send('decrypted',fileName);
            }
        });
    }
}