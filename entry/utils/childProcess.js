
const priter = require('qtnode-middleware-console');

const { spawn, exec } = require('child_process');


exports.execPromise = function (cmd, opts) {
    return new Promise(async (resolve, reject) => {
        let ls = exec(cmd, opts);

        let result = '' ;
        ls.stdout.on('data', (data) => {
            result += data.toString() + '\n';
        });

        ls.stderr.on('data', (data) => {
            result += data.toString() + '\n';
        });

        ls.on('error', (err) => {
            result += err.toString() + '\n';
        });

        ls.on('close', (code) => {
            if(code == 0)
                resolve(result);
            else
                reject(result);
        });

    });
};

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
};
