import axios from "axios";
import store from "../store/userInfo"
import {
    URL
} from "./config";
import {
    Loading,
    Notify
} from 'quasar'
import request from "@/utils/request";

var isLoading = 0
var timer
const CancelToken = axios.CancelToken
var cancel
var cancelToken = new CancelToken(function executor(c){
    cancel = c;
})

/**
 * 增加一个加载中的请求，有加载中的请求时显示Loading
 */
function SetLoading(){
    if (isLoading == 0) {
        Loading.show()
        timer = setTimeout(()=>{
            if(isLoading>0){
                Notify.create({
                    message: '请求超时，请重试',
                    position: 'center',
                    timeout: '2000'
                })
                cancel('TimeOut')
            }
        },5000) 
    }
    isLoading++;
}
/**
 * 减少一个加载中的请求，无加载中的请求时隐藏Loading
 */
function UnsetLoading(){
    isLoading--;
    if (isLoading == 0) {
        Loading.hide()
        isLoading = 0
        if (timer != void 0) {
            clearTimeout(timer)
            Loading.hide()
            timer = void 0
        }
    }
}
/**
 * 
 * @param {String} api 接口名称
 * @param {Object} params 请求参数
 */
function get(api, params) {
    SetLoading()
    return new Promise((resolve,reject) => {
        axios.get(`${URL}` + api, {
            cancelToken :cancelToken,
            headers: {
                Authorization: store.state.token
            },
            params: params
        }).then(response => {
            resolve(response.data);
            UnsetLoading();
        }).catch((error) => {
            reject(error)
            UnsetLoading();
        })
    })
}
/**
 * 
 * @param {String} api 接口名称
 * @param {Object} params 请求参数
 */
function post(api, params) {
    SetLoading()
    return new Promise((resolve,reject) => {
        axios.post(`${URL}` + api, {}, {
            cancelToken :cancelToken,
            headers: {
                Authorization: store.state.token
            },
            params: params
        }).then(response => {
            resolve(response.data);
            UnsetLoading();
        }).catch((error) => {
            reject(error)
            UnsetLoading();
        })
    })
}

export async function myBBS(payload) {
    console.log('in get delete BBS', payload)
    return request({
        url: `bbsservice/posts/${payload.postId}`,
        method: 'delete',
        params: {
            
        }
    })
}

export async function showBBS(payload) {
    console.log('in searching BBS', payload);
    return request({
        url: `bbsservice/personal/posts/${payload.currentPage}`,
        method: 'get',
        params: {
            attributes:payload.attributes,
            limit: payload.limit,
        }
    })
  }

/**
 * 取消所有请求
 */
export function RequestCancel(){
    if(isLoading>0){
        cancel('cancel')
        cancelToken = new CancelToken(function executor(c){
            cancel = c;
        })
    }
    clearTimeout(timer)
    timer = void 0
}

export const GetPost = params => get('Show/post', params);
export const GetPosts = params => get('Show/getPosts', params);
export const GetReply = params => get('Show/reply', params);
export const PostReply = params => post('Post/reply', params);
export const CanEvaluate = params => get('Post/CanEvaluate', params);
export const Evaluate = params => post('Post/evaluate',params)
export const CancelEvaluation = params => post('Post/CancelEvaluation',params)
