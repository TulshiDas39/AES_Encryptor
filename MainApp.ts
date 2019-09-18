
import {BrowserWindow, app, ipcMain, dialog} from "electron";
import { Encryption } from "./Encryption";

export class MainApp {

    private mainWindow?:BrowserWindow;
    private filePath?:string;

    constructor() {
        this.init();
    }

    private init() {
        this.setAppEvents();
        this.setIpcEvents();
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

        this.mainWindow.loadFile('index.html')
        this.mainWindow.on('closed', ()=> {
            this.mainWindow = null as any;
        })
    }

    private setIpcEvents(){
        this.openFileEvent();
    }

    private openFileEvent(){
        ipcMain.on('select-file',(event:any)=>{
            console.log('select event');
            let filePaths = dialog.showOpenDialog({title:"select file", properties: ['openFile']}) as string[];
            console.log(filePaths);

            if(filePaths) new Encryption().encrypt(filePaths[0]);

        })
    }

}