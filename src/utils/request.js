import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-ui'
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

//第三步 创建拦截器  http request 拦截器
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
    isLoading++;
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
    isLoading--;
    // //debugger
    // if (response.data.code == 28004) {
    //   console.log("response.data.resultCode是28004")
    //   // 返回 错误代码-1 清除ticket信息并跳转到登录页面
    //   //debugger
    //   window.location.href = "/login"
    //   return
    // } else {
    //   if (response.data.code !== 20000) {
    //     if (response.data.code != 25000) {
    //       Message({
    //         message: response.data.message || 'error',
    //         type: 'error',
    //         duration: 5 * 1000
    //       })
    //     }
    //   } else {
    return response.data;
    // }
    // }
  },
  error => {
    isLoading--;

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

export default service