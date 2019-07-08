const wx = require('weixin-js-sdk');
import {get, post} from "../../utils/request";

var $ = require("jquery");
// 分享配置
const share = {
    title: "",
    desc: "",
    link: "",
    imgUrl: ""
};
// 微信鉴权设置
const wxOpt = {
    userid: "",
    debug: !1,
    appId: "",
    timestamp: "",
    nonceStr: "",
    signature: "",
    apis: ["hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareQZone", "updateAppMessageShareData", "updateTimelineShareData",]
};
export default {
    init() {

        wx.config({
            debug: wxOpt.debug,
            appId: wxOpt.appId,
            timestamp: wxOpt.timestamp,
            nonceStr: wxOpt.nonceStr,
            signature: wxOpt.signature,
            jsApiList: wxOpt.apis
        })
    },
    getWxConfig() {
        let url;
        return new Promise((res, rej) => {
            // alert(window.location.href.split("#")[0]);
            post("", {
                // url: encodeURIComponent(window.location.href.split("#")[0])
                url: window.location.href.split("#")[0]
            }).then((resp) => {
                $.extend(wxOpt, resp);
                res({
                    result: true
                })
            }).catch((err) => {
                console.log(err);
            })
        });
    },

    Handler(callback) {
        let that = this;
        this.getWxConfig().then((tem) => {
            this.init();
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: wxOpt.apis, // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function (res) {
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
                wx.getLocation({
                    success: function (res) {
                        console.log("人物坐标位置=", res);
                    },
                    cancel: function (res) {
                        console.log(res);
                    }
                });
                wx.onMenuShareTimeline({
                    title: share.desc,
                    imgUrl: share.imgUrl,
                    link: share.link,
                    success: function () {
                        // 设置成功
                    }
                });
                wx.onMenuShareAppMessage({
                    title: share.title,
                    desc: share.desc,
                    imgUrl: share.imgUrl,
                    link: share.link,
                    success: function () {
                    }
                });
                callback && callback();
            })
        });
    },
};