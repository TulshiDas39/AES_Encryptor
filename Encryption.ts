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
}