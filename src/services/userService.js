import request from "@/utils/request"

/**
 * 邮箱登录用户的API接口，如果成功返回token
 */


export async function loginUser(userInfo){
  ////console.log("in login api",userInfo)
  return request({
    url: 'ucenterservice/login',
    method: "post",
    data: userInfo
  })
}

/**
 * 注册用户API，如果成功返回token以及userId，并将token，userId保存在浏览器的localstorage中；
 * @param {Object} payload payload需要传入 email，password，nickname，以及邮箱的相关验证码
 */
export async function registerUser(payload) {
  ////console.log("in userSevice::reg", payload);
  return request({
    url: 'ucenterservice/register',
    method: "post",
    data: payload
  })
}

/**
 * 验证用户昵称是否重复
 */
export async function validateNickname(userInfo){
 ////console.log("in reg api",userInfo)
  return request({
    url: 'ucenterservice/register/validate/'+userInfo.nickname,
    method: "get",
  })
}



/**
 * 向用户的邮箱发送验证码
 * @param {Object} payload
 */
export async function sentAuthCode(payload) {
  ////console.log("in sending AuthCode", payload);
  return request({
    url: 'emailservice/send',
    method: "post",
    data: payload
  })
}

/**
 * 确认邮箱验证码
 * @param {Object} payload
 */
export async function validateAuthCode(payload) {
  ////console.log("validate AuthCode", payload.addr+'/'+payload.code);
  return request({
    url: 'emailservice/validate/'+payload.addr+'/'+payload.code,
    method: "get",
  })
}
/**
 * 向用户的手机发送验证码
 * @param {Object} payload
 */
export async function sentMsmAuthCode(payload) {
  ////console.log("in sending AuthCode", payload.phone);
  return request({
    url: 'msmservice/send/'+payload.phone,
    method: "post",
  })
}

/**
 * 确认手机验证码
 * @param {Object} payload
 */
export function validateMsmAuthCode(payload){
  ////console.log("validate AuthCode", payload);
  return request({
    url: 'msmservice/validate/'+payload.code+'/'+payload.phone,
    method: "get",
  })
}

/**
 * 获取登陆用户的信息
 * @param {Object} payload
 */
export function getUserInfo(payload) {
  ////console.log("getUserInfo")
  return request({
    url: 'infoservice/info',
    method: "get",
    params: payload,
  })
}
