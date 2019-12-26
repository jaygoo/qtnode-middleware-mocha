
const priter = require('qtnode-middleware-console');

const { spawn, exec } = require('child_process');


exports.execPromise = function (cmd, opts) {
    return new Promise(async (resolve, reject) => {
        exec(cmd, opts, (error, stdout, stderr) => {
            if (error) {
                reject(false);
            }
            if(!!stderr) {
                reject(false);
            }
            priter.data(`${stdout}`);

            resolve(true);
        });
    });
}

exports.spawnPromise = async (cmd, args = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        const ls = spawn(cmd, args, opts);

        let result = '' ;
        ls.stdout.on('data', (data) => {
            result = data.toString();
        });

        ls.stderr.on('data', (data) => {
            result = data.toString();

        });

        ls.on('error', (err) => {
            result = err.toString();
        });

        ls.on('close', (code) => {
            if(code == 0)
                resolve(result);
            else
                reject(result);
        });
    });
}
