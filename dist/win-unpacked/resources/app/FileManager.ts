import { readFileSync, writeFileSync, createWriteStream } from "fs";
import { sep, join } from "path";
import { dialog, ipcMain } from "electron";

export enum Status{encryption,decryption,none};

export class FileManager{
  
    public static data:string;
    private static filePath:string;
    public static status = Status.none;

    constructor(){
        this.init();
    }

    private init() {
        //this.setSaveFileEvent();
    }

    // private setSaveFileEvent() {
    //     ipcMain.on('save-file',(event:any)=>{
    //         this.saveFile();
    //     })
    // }
    
    public readFileContent(filePath: string) {
        return readFileSync(filePath, 'utf8');
    }

    public getFilePath(){
        return FileManager.filePath;
    }

    public setFilePath(path:string){
        FileManager.filePath = path;
        if(path.substring(path.lastIndexOf('.'))=== '.prt') FileManager.status = Status.decryption;
        else FileManager.status = Status.encryption;
    }


    
    public getDestinationPath(){
        let extention = "";
        if(FileManager.status == Status.encryption) extention = '.prt';
        else extention = '.txt';
        let filename = FileManager.filePath.substring(FileManager.filePath.lastIndexOf(sep) + 1);
        let destinationDir = FileManager.filePath.substring(0,FileManager.filePath.lastIndexOf(sep)+1);
        let newFileName = filename.substr(0, filename.lastIndexOf('.'));
        newFileName += extention;

        return join(destinationDir,newFileName);

    }

    public saveFile() {
        const options = {
            defaultPath: this.getDestinationPath()
        }
        dialog.showSaveDialog(null as any, options, (path?: string) => {
            if (path) {
                console.log(path);
                this.writeFile(path, FileManager.data,);
            }
        });
    }

    private writeFile(filePath: string, data: string) {
        console.log('writing to file');
        
        writeFileSync(filePath, data,{encoding:'utf8'});
        // var stream = createWriteStream(filePath, {flags: 'w'});
        // stream.write(data);


    }

    public getEncryptedFileName(){
        this.getDestinationPath().substring(this.getDestinationPath().lastIndexOf(sep)+1);
    }
}