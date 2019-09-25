import { dialog, ipcRenderer } from "electron";

class Index {

  private fileOpener = document.getElementById('selection') as HTMLInputElement;
  private fileSaver = document.getElementById('save') as HTMLInputElement;
  private encryptBtn = document.getElementById('encrypt') as HTMLInputElement;
  private decryptBtn = document.getElementById('decrypt') as HTMLInputElement;


  private encrypted = false;
  private selectedFilePath?: string;
  constructor() {
    this.init();
  }

  private init() {
    this.setFilefileOpenEvent();
    this.saveFile();
    this.fileSelectionEvent();
    this.setEncryptionEvent();
    this.setDecryptionEvent();
    this.setEncryptedEvent();
    this.setDecryptedEvent();
  }
  private setDecryptedEvent() {
    ipcRenderer.on('decrypted',(event:any,fileName:string)=>{
      (<HTMLElement>document.getElementById('save')).style.display = 'inline';
      (<HTMLElement>document.getElementById('result-file')).style.display = 'inline';
      (<HTMLElement>document.getElementById('result-file')).innerHTML = fileName;
    })
  }

  private setEncryptedEvent() {
    ipcRenderer.on('encrypted',(event:any,fileName:string)=>{
      (<HTMLElement>document.getElementById('save')).style.display = 'inline';
      (<HTMLElement>document.getElementById('result-file')).style.display = 'inline';
      (<HTMLElement>document.getElementById('result-file')).innerHTML = fileName;
    })
    
  }

  private setDecryptionEvent() {
    this.decryptBtn.onclick = () => {
      console.log('decryptbtn clicked');
      ipcRenderer.send('decrypt-file');
    }
  }

  private setEncryptionEvent() {
    this.encryptBtn.onclick = () => {
      console.log('starting encrypting');
      ipcRenderer.send('encrypt-file');
    }
  }

  private fileSelectionEvent() {
    ipcRenderer.on('selected-file', (event: Event, fileName: string) => {
      //this.selectedFilePath = path;
      console.log('ipcRenderer file selected');
      console.log(fileName);
      (<HTMLElement>document.getElementById('selected-file')).innerHTML = fileName;
      this.toogleDisplay('inline','action-btn');
    })
  }

  private setFilefileOpenEvent() {
    console.log('file opener clicked');
    this.fileOpener.onclick = () => {
      ipcRenderer.send('select-file');
    }
  }

  private saveFile() {
    console.log('file save clicked');
    this.fileSaver.onclick = () => {
      ipcRenderer.send('save-file');
    }
  }

  private toogleDisplay(displayVal: string, className: string) {
    var all = document.getElementsByClassName(className) as any;
    for (var i = 0; i < all.length; i++) {
      all[i].style.display = displayVal;
    }
  }

}

new Index();