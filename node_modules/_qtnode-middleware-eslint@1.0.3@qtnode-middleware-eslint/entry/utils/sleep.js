/**
 * Copyright (c) 2016-present Alibaba Group Holding Limited
 * @author Houfeng <admin@xhou.net>
 */

module.exports = function (fun, delay) {
  return new Promise(resolve => {
    setTimeout(function () {
        fun();
        resolve();
    }, delay);
  });
};