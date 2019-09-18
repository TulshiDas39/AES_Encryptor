import { dialog, ipcRenderer } from "electron";

class Index{

    private fileOpener =  document.getElementById('selection') as HTMLInputElement;
    constructor(){
      this.init();
    }

    private init(){
      this.fileOpen();
    }

    private fileOpen(){
      console.log('file opener clicked');
      this.fileOpener.onclick = ()=>{
        ipcRenderer.send('select-file');
        
      }
    }
}

new Index();