import axios from 'axios'
import qs from 'qs'
import { Loading,Notify } from 'quasar'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://139.224.53.131:8002/tjspace/api', // base_url
  timeout: 20000 // 请求超时时间
});

var isLoading = 0
const CancelToken = axios.CancelToken
var cancel
var cancelToken = new CancelToken(function executor(c) {
  cancel = c;
})

function setLoading() {
  if(isLoading==0){
    Loading.show()
  }
  isLoading++;
}

function unsetLoading(){
  isLoading--;
  if(isLoading==0){
    Loading.hide();
  }
}

//创建拦截器  http request 拦截器
service.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = "*";
    //debugger
    //判断cookie里面是否有名称是guli_token数据
    if (cookie.get('TJSPACE_token')) {
      //把获取cookie值放到header里面
      config.headers['token'] = cookie.get('TJSPACE_token');

    }
    config.paramsSerializer = params => {
      return qs.stringify(params, { indices: false })
    }
    config.cancelToken = cancelToken;
    setLoading();
    return config
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
service.interceptors.response.use(
  // 这将会在之后统一进行配置
  response => {
    if (response.data && response.data.data && response.data.data.token) {
      cookie.set('TJSPACE_token', response.data.data.token)
      console.log("token", cookie.get('TJSPACE_token'))
    }
    unsetLoading();
    // 其他地方登录
    if (response.data.code == 20004) {
      cookie.remove('TJSPACE_token')
      // 返回 错误代码-1 清除token信息并跳转到登录页面
      Notify.create({ color: 'negative', message: response.data.message, icon: 'report_problem' })
      return Promise.reject(response.data)   // 返回接口返回的错误信息
    } else if (response.data.code == 20003) {
      cookie.remove('TJSPACE_token')
      // 返回 错误代码-1 清除token信息并跳转到登录页面
      Notify.create({ color: 'negative', message: "您已长时间未登录，请重新登录", icon: 'report_problem' })
      return Promise.reject(response.data)   // 返回接口返回的错误信息
    }
    // TODO 配置全局统一通知！
    // Notify.create({ color: response.'negative', message: "您已长时间未登录，请重新登录", icon: 'report_problem' })
    return response.data;
  },
  error => {
    unsetLoading();

    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

//取消所有请求
export function RequestCancel() {
  if (isLoading > 0) {
    cancel('cancel')
    cancelToken = new CancelToken(function executor(c) {
      cancel = c;
    })
  }
}

this

export default service