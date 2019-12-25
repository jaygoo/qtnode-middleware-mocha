'use strict';

const priter= require('qtnode-middleware-console');
const childProcess = require('./utils/childProcess');
const path = require('path');
const { spawn, exec } = require('child_process');

const fs = require('fs');

function findCommand(dirname, command) {
    const commandPath = path.normalize(
        `${dirname}/node_modules/.bin/${command}`
    );
    if (fs.existsSync(commandPath)) return commandPath;
    if (dirname == '/' || dirname == '.' || /^[a-z]\:\/\/$/i.test(dirname)) {
        return;
    }
    return findCommand(path.dirname(dirname), command);
}

let execPromise = function (cmd, opts) {
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

module.exports = function (args) {
    Object.assign({}, args);

    const nyc = findCommand(__dirname, 'nyc');
    const mocha = findCommand(__dirname, 'mocha');

    return async function (next) {
        priter.info('正在进行单元测试>>>>>>>>>>>>>');

        let cmd = `${nyc} ${mocha} --require babel-core/register --recursive --reporter spec --bail 
         ${path.resolve(childProcess.pwd(), './test/**/*.test.js')}`;

        await execPromise(cmd, {encoding: 'utf8', cwd: process.cwd()})
            .then((data) => {
                priter.data(data);
                let arrErr = data.match(/\d+(?= passing)/);
                let arrWaring = data.match(/\d+(?= failing)/);
                if(arrErr != null && arrErr != null) {
                    priter.warn('单元测试未通过！  passing:' + arrErr[0] + '  failing:' + arrWaring[0]);
                    process.exit(1);
                }
                priter.tip('单元测试通过');
            })
            .catch((data)=>{
                priter.data(data);
                let arrErr = data.match(/\d+(?= passing)/);
                let arrWaring = data.match(/\d+(?= failing)/);
                if(arrErr != null && arrErr != null) {
                    priter.warn('单元测试未通过！  passing:' + arrErr[0] + '  failing:' + arrWaring[0]);
                    process.exit(1);
                }
                priter.tip('单元测试通过');
            });

        next();
    };
};


