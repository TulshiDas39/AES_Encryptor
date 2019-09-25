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
  }
  private setDecryptionEvent() {
    this.decryptBtn.onclick = ()=>{
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
    ipcRenderer.on('selected-file', (event: Event, path: string) => {
      this.selectedFilePath = path;
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

}

new Index();