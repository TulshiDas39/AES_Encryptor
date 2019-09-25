
import {BrowserWindow, app, ipcMain, dialog} from "electron";
import { Encryption } from "./Encryption";
import { rename, createReadStream, createWriteStream, unlink } from "fs";
import { FileManager } from "./FileManager";
import { Decryption } from "./Decryption";

export class MainApp {

    public mainWindow?:BrowserWindow;
    public static myWindow?:BrowserWindow;
    private fileManager = new FileManager();

    constructor() {
        this.init();
        new Encryption();
        new Decryption();


    }

    private init() {
        this.setAppEvents();
        this.setIpcEvents();
        this.setSaveFileEvent();
        this.handleException();
    }
    handleException() {
        process.on('uncaughtException', ()=>{
            console.log('error happened');
        })
    }

    private setSaveFileEvent() {
        ipcMain.on('save-file',(event:any)=>{
            this.fileManager.saveFile();
        })
    }

    private setAppEvents() {
        app.on('ready', this.createWindow)
        app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') app.quit()
        })

        app.on('activate', ()=> {
            if (this.mainWindow === null) this.createWindow()
        })

    }

    private createWindow() {

        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })

        MainApp.myWindow = this.mainWindow;

        this.mainWindow.loadFile('index.html')
        this.mainWindow.on('closed', ()=> {
            this.mainWindow = null as any;
        })
    }

    private setIpcEvents(){
        this.openPlainTextFileEvent();
    }

    private openPlainTextFileEvent(){
        ipcMain.on('select-file',(event:any)=>{
            console.log('select event');
            let filePaths = dialog.showOpenDialog({title:"select file", properties: ['openFile']}) as string[];
            console.log(filePaths);

            if(filePaths) {
                this.fileManager.setFilePath(filePaths[0]);
                console.log(this.fileManager.getFilePath());
                
                if(this.mainWindow){
                    this.mainWindow.webContents.send('selected-file',filePaths[0]);
                }
            }

        })
    }

}