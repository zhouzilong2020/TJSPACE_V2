import request from "@/utils/request";
/**
 * 获取所有院系的名称
 */

export  function getDepts(){
    return request({
      url: 'infoservice/depts/names',
      method: "get",
    })
  }

export async function getCourse(payload) {
    console.log('in searching course', payload);
    return request({
        url: `infoservice/personal/courses/favorite/${payload.currentPage}`,
        method: 'get',
        params: {
            limit: payload.limit,
        }
    })
  }
/**
 * 获取所有专业的名称
 */

export  function getMajors(data){
  //console.log("getMajors",data)
  return request({
    url: 'infoservice/depts/{deptId}/majors?deptId='+data,
    method: "get",
  })
}

/**
 * 保存个人信息
 */

export async  function Update(data){
  //console.log("update",data)
  return request({
    url: 'infoservice/personal/info',
    method: "put",
    data:data,
  })
}

/**
 * 保存头像
 */

export async  function UpdateOSS(data){
  //console.log("update",data.avatar)
  return request({
    url: 'infooss/fileoss/avatar',
    method: "post",
    data:data.avatar,
  })
}

