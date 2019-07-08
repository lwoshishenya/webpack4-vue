import axios from 'axios';
import Vue from "vue";

export const isWeixin = /MicroMessenger/ig.test(window.navigator.userAgent.toLowerCase());
let host = '127.0.0.1';
axios.defaults.timeout = 300000;
axios.defaults.baseURL = host;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=UTF-8';
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export let ajaxUrl = host;

export function get(url, params = {}, callback, err) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            if (res.status == 200 && res.data.code == 200) {
                resolve(res.data.data);
                callback && callback();
            } else {
                err && err();
            }

        }).catch(err => {

            reject(err)
        })

    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param callback
 * @param err
 * @returns {Promise}
 */
export function post(url, data = {}, callback, err) {
    return new Promise((resolve) => {

        axios.post(url, data).then(res => {
            if (res.status == 200 && res.data.code == 200) {
                resolve(res.data.data);
                callback && callback();
            } else {
                err && err(res.data.message);
            }

        }).catch(err => {

            reject(err)
        })
    })
}


export function judgeCode(code, message) {

}