import axios from 'axios'
import {ajaxUrl, get, post, isWeixin} from './utils/request';

const method = {
    '$phone': /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent),
    '$ajaxUrl': ajaxUrl,
    '$weixin': isWeixin,
    // 接口调用
    '$axios': axios,
    '$post': post,
    '$get': get,
    '$getRandom'(to, from) {
        return Math.floor(Math.random() * to + from);
    },
    // 日期格式化
    /**
     *
     * @param time
     * @param pattern  "YYYY-MM-DD hh:mm:ss"
     * @returns {*}
     */
    '$format'(time, pattern = 'YYYY-MM-DD hh:mm:ss') {
        if (time && pattern) {
            try {
                let date = new Date(time.replace('T', ' ').replace('Z', ' ').replace(/-/g, '/'));
                let opt = {
                    'Y+': date.getFullYear(),
                    'M+': date.getMonth() + 1,
                    'D+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (let k in opt) {

                    pattern = pattern.replace(new RegExp(k, 'g'), opt[k] < 10 ? '0' + opt[k] : opt[k]);
                }
                return pattern;
            } catch (e) {
                return e
            }
        }
    },
    $bgInit(music) {
        let state = 0;
        document.addEventListener('touchstart', () => {
            if (state == 0) {
                this.$waitPlay(music);
                state = 1;
            }
        }, false);

        document.addEventListener("WeixinJSBridgeReady", () => {
            music.play();
        }, false);
        this.$waitPlay(music);
        //循环播放
        music.onended = function () {
            music.load();
            music.play();
        }
    },
    $waitPlay(music) {
        setTimeout(() => {
            music.play();
        }, 100)
    },
    $pause(music) {
        music.pause();
    },
};
export default (vue) => {
    for (let key in method) {
        if (method.hasOwnProperty(key)) {
            vue.prototype[key] = method[key]
        }
    }
}