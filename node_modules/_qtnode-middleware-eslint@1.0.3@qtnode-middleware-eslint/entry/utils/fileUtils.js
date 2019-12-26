//下载参数
var http = require("http");
var fs = require("fs");
var path = require("path");
const unzip = require("unzip");

var downFlag = false;
var downUrl = '';
var downFileName = '';
const printer = require("qtnode-middleware-console");
const compressing = require('compressing');


exports.download =   async (url, dir, fileName) => {

    return new Promise((resolve, reject) => {
        printer.info("开始下载: " + url + fileName);

        let req = http.request(url + fileName, (res)=>{
            var contentLength = parseInt(res.headers['content-length']);

            var downLength = 0;

            var out = fs.createWriteStream(dir + "/" + fileName);
            res.on('data', function (chunk) {

                downLength += chunk.length;
                var progress =  Math.floor(downLength * 100 / contentLength);
                var str = "下载进度："+ progress +"%";
                printer.data(str);

                //写文件
                out.write(chunk, function () {

                });

            });
            res.on('end', function() {
                downFlag = false;
                if (isNaN(contentLength)) {
                    printer.error("下载异常");
                    reject(false);
                    return;
                }
                if (downLength < contentLength) {
                    printer.error("下载异常");
                    reject(false);
                    return;
                }
                req.end();

                resolve(true);

            });
        });

        req.on('error', function(e){
            printer.error("download error:  " + url);
            reject(false);

        });
        req.end();
    })

}

exports.unzip = async (zip_path, taget_path) => {
    return new Promise((resolve, reject) => {
        //判断压缩文件是否存在
        if (!fs.existsSync(zip_path)) {
            printer.error("unzip error");

            process.exit(1);
        }

        let unzip_extract = unzip.Extract({path: taget_path});
        //监听解压缩、传输数据过程中的错误回调
        unzip_extract.on('error', (err) => {
            reject(err);
        });
        //监听解压缩、传输数据结束
        unzip_extract.on('finish', (...args) => {
            resolve(args);
        });


        fs.createReadStream(zip_path).pipe(unzip_extract)
            // .on("close", function (...args) {
            //     console.log(" 解压完毕");
            //     resolve(args);
            // })
            // .on("error", (e) => {
            //     console.log("解压出错")
            //     reject(e);
            // })
    })



}


// exports.unzip = async (zip_path, taget_path) => {
//
//     // compressing.zip.compressDir('nodejs-compressing-demo', 'nodejs-compressing-demo.zip')
//     //     .then(() => {
//     //         console.log('success');
//     //     })
//     //     .catch(err => {
//     //         console.error(err);
//     //     });
//
// // 解压缩
// console.log(zip_path, taget_path);
//     return new Promise((resolve, reject) => {
//         compressing.zip.uncompress(zip_path, taget_path)
//             .then(() => {
//                 resolve();
//                 console.log('success');
//             })
//             .catch(err => {
//                 reject();
//                 console.error(err);
//             })
//
//     })
//
// }