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
