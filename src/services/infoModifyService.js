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

