// Modules to control application life and create native browser window
//const { app, BrowserWindow } = require('electron')
import {BrowserWindow, app, ipcMain, dialog} from "electron";
const path = require('path')

export class MainApp {

    private mainWindow?:BrowserWindow;

    constructor() {
        this.init();
    }

    init() {
        this.setAppEvents();
        this.setIpcEvents();
    }

    setAppEvents() {
        app.on('ready', this.createWindow)

        // Quit when all windows are closed.
        app.on('window-all-closed', function () {
            // On macOS it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') app.quit()
        })

        app.on('activate', ()=> {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (this.mainWindow === null) this.createWindow()
        })

    }

    createWindow() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        })

        // and load the index.html of the app.
        this.mainWindow.loadFile('index.html')

        // Open the DevTools.
        // mainWindow.webContents.openDevTools()

        // Emitted when the window is closed.
        this.mainWindow.on('closed', ()=> {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null as any;
        })
    }

    setIpcEvents(){
        this.openFileEvent();
    }

    openFileEvent(){
        ipcMain.on('select-file',(event:any)=>{
            console.log('select event');
            console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}));
        })
    }
}