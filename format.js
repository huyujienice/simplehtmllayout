const { exec } = require('node:child_process');
const FORMAT_PATH_CONFIG = [
    'src/',
]
const gitpushCommand = `git add . && git commit -am 'style: :rocket: auto prettier format code' && git push && git status`
if (FORMAT_PATH_CONFIG.length) {
    let command = 'prettier ', arr = FORMAT_PATH_CONFIG
    arr.forEach(it => {
        command = `${command}--write ${it} `
    })
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: \n${stdout}`);
        console.error(`stderr: \n${stderr}`);
        exec(gitpushCommand)
    });
}

