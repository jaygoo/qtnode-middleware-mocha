'use strict';

const webpack = require('webpack');
const priter= require('qtnode-middleware-console');
const path = require('path');


module.exports = function (args) {
    let opts = Object.assign({}, args);

    const prodconfig = require(path.resolve(path.resolve(opts.rootDir, 'wpconf/prod.js')));

    return async function (next) {
        priter.info('start build');

        webpack(prodconfig, (err, stats) => {
            if (err) {
                priter.info('build faild');

                throw err;
            }

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n' );

            if (stats.hasErrors()) {
                priter.info('build faild');

                process.exit(1);
            }
        });
        priter.info('build success');

        next();
    };
};
