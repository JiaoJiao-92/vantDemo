import axios from 'axios';
var accesstoken = "G1CAF495DV21307D1T905DA5JAADD00ABM77359402IC1E96271K9";
export const http = (url = "", data = {}, type = "GET") => {
    console.log("http--request---url:" + url);
    return new Promise((resolve, reject) => {
        let proObj;
        if (type == "GET") {
            proObj = axios({
                method: "GET",
                url: url,
                data: data,
                withCredentials: true, //get请求需要cookie
            });
        } else {
            proObj = axios({
                method: "POST",
                url: url,
                data: data,
                withCredentials: false, //get请求需要cookie
            });
        }
        proObj.then((response) => {
            if (response) {
                resolve(response.data);
            }
        }).catch((error) => {
            if (error) {
                reject(error)
            }
        });
    });
};

// 以下是实际接口
//获取所有的区域列表
// export const getAreaList = () => http("/webclientApi/application/areacode/shanxi_area.js", {});
//获取栏目列表
// export const getTypeList = (_labelId) => http("/slaveApi/homed/programtype/get_list?accesstoken=" + accesstoken + "&label=" + _labelId, {});
//获取第三方栏目列表
// export const getThirdLink = () => http('webclientApi/application/areacode/thirdWebLinks.js');
//获取列表数据
// var sizeInfo = '&chnlsize=500x280|246x138|160x200&hdsize=500x280|246x138|160x200&sdsize=500x280|246x138|160x200&livesize=500x280|246x138|160x200&vodsize=500x280|246x138|160x200&appsize=500x280|246x138|160x200&musicsize=500x280|246x138|160x200';
// export const getProgramList = (_labelId, _currPage, _pageNum) => http("/slaveApi/homed/program/get_list?accesstoken=" + accesstoken + "&label=" + _labelId + "&pageidx=" + _currPage + "&pagenum=" + _pageNum, {});
//获取新闻数据
// export const getNewsDetail = (_newsId) => http("/slaveApi/news/get_info?accesstoken=" + accesstoken + "&newsid=" + _newsId, {});

// 本地测试接口
//获取所有的区域列表
export const getAreaList = () => http('../../../static/data/shanxi_area.js');
//获取栏目列表
export const getTypeList = (_labelId) => http('../../../static/data/type_' + _labelId + '.txt');
//获取第三方栏目列表
export const getThirdLink = () => http('../../../static/data/thirdWebLinks.js');
//获取列表数据
export const getProgramList = (_labelId, _currPage, _pageNum) => (_labelId.indexOf("_") > -1) ? http(_labelId) : http('../../../static/data/list_33439.txt');
//测试图文和点播共存的显示
// export const getProgramList = (_labelId, _currPage, _pageNum) => http('../../../static/data/list.txt'); //测试翻页加载
//获取新闻数据
export const getNewsDetail = (_newsId) => http('../../../static/data/info.txt');

export const getNewsVideoDetail = (_newsId) => http('../../../static/data/info_video.txt');