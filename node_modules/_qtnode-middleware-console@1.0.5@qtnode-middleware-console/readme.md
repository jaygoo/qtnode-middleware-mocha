## pfw-h5-ts项目说明
* pconfig.ts //项目配置文件说明

```
type ConfType = ConfProType | ConfHostType | ConfLogerType;
type FrameType = 'react' | 'vue' | 'taro' | 'mpvue';
type appType = 'h5' | 'minapp';

/*项目配置*/
interface ConfProType {

    isDebug ?: boolean; //debug
    appType ?: appType; //项目类型
    frameType ?: FrameType; //框架类型
    proName ?: string; //项目名称
    appPath?: string; //app地址

}

/*host配置*/
interface ConfHostType {
    a ?: string;
}

/*打印监控配置*/
interface ConfLogerType {
    isDebug ?: boolean; // 是否打印
    ddWaringUrl ?: string; //钉钉报警监控
    pid?: string; //钉钉报警，项目唯一id
}


```
* pconfig.ts 配置demo

```
import {GlobalConfig}  from "./pfw/config/GlobalConfig";

const config = new GlobalConfig();
config.configPro({
    isDebug: true,
    appType: "h5",
    frameType: "react",
    proName: "拼团",

});

config.configHost({


});

config.configLogger({
    isDebug: true,
    ddWaringUrl: "https://s-alarm.hfjy.com/access/add_front/",
    // ddWaringUrl: "http://kail.alarm.com/access/add_front/",
    pid: "eaEW8Mxum25iRWN4i1",

});
export default config;


```