import { execFile } from "child_process";
import { readSync, readFileSync, writeFileSync } from "fs";

export class Encryption {
    constructor() {

    }

    public encrypt(filePath: string) {
        console.log('starting encryption:' + filePath);
        let data = this.readFileContent(filePath);
        console.log(data);


        execFile('./tools/encryption.exe', [data], (err: any, stdout: string, stderr: string) => {
            if (err) {
                console.log('err happened');
                console.log(err);
            }
            else if (stderr) console.log('stderr happened');
            else {
                console.log('stdout:' + stdout);
                //let hexStr = this.strToHexStr(stdout);
                this.writeFile(stdout);
            }
        });
    }

    private readFileContent(filePath: string) {
        return readFileSync(filePath, 'utf8');
    }

    private writeFile(data: string) {
        console.log('writing to file');
        writeFileSync("synchronous.txt", data);

    }

    private strToHexStr(str:string){
        let hex:string[];
        let hexStr:string = "";
        hex = this.strToHexArray(str);
        hex.forEach(element => {
            hexStr+=" "+ element;
        });

        return hexStr;

    }

    private strToHexArray(str:string){
        let hex:string[] = [];
        for (let a = 0; a < str.length; a = a + 1) {
            hex.push('0X'+str.charCodeAt(a).toString(16));
        }

        return hex;
    }
}