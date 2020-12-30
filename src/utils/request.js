import axios from 'axios'
<<<<<<< HEAD
import { Message } from 'element-ui'
=======
import qs from 'qs'
// import { Message } from 'element-ui'
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8001', // api的base_url
  timeout: 20000 // 请求超时时间
=======
  baseURL: 'http://139.224.53.131:8002/tjspace/api', // base_url
  timeout: 20000 // 请求超时时间
});

var isLoading = 0
const CancelToken = axios.CancelToken
var cancel
var cancelToken = new CancelToken(function executor(c){
    cancel = c;
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
})

//第三步 创建拦截器  http request 拦截器
service.interceptors.request.use(
  config => {
<<<<<<< HEAD
=======
    config.headers['Access-Control-Allow-Origin'] = "*";
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
    //debugger
    //判断cookie里面是否有名称是guli_token数据
    if (cookie.get('TJSPACE_token')) {
      //把获取cookie值放到header里面
      config.headers['token'] = cookie.get('TJSPACE_token');
<<<<<<< HEAD
=======
    
    }
    config.paramsSerializer = params => {
      return qs.stringify(params, { indices: false })
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
    }
    config.cancelToken = cancelToken;
    isLoading++;
    return config
  },
  err => {
    return Promise.reject(err);
<<<<<<< HEAD
  })
=======
  });
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43

// http response 拦截器
service.interceptors.response.use(
  // 这将会在之后统一进行配置
  response => {
<<<<<<< HEAD
    //debugger
    if (response.data.code == 28004) {
      console.log("response.data.resultCode是28004")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //debugger
      window.location.href = "/login"
      return
    } else {
      if (response.data.code !== 20000) {
        //25000：订单支付中，不做任何提示
        if (response.data.code != 25000) {
          Message({
            message: response.data.message || 'error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      } else {
        return response;
      }
=======
    if(response.data&&response.data.data&&response.data.data.token){
      cookie.set('TJSPACE_token',response.data.data.token)
      console.log("token",cookie.get('TJSPACE_token'))
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43
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
<<<<<<< HEAD
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
=======
    isLoading--;
    
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });

//取消所有请求
export function RequestCancel(){
    if(isLoading>0){
        cancel('cancel')
        cancelToken = new CancelToken(function executor(c){
            cancel = c;
        })
    }
}
>>>>>>> f7c72e8c997b8ab6cc47e514967164d2e7259f43

export default service