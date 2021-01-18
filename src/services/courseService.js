import request from "../utils/request"

/**
 * 得到课程的信息
 * @param {*} payload 
 */
export async function getCourseInfo(payload) {
    //console.log("in get courseInfo", payload)
    return request({
        url: `infoservice/courses/${payload.courseId}`,
        method: 'get'
    })
}

/**
 * 收藏课程, 重复收藏就是取消！
 * @param {*} payload {token, userId, courseId, teacherId}
 */
export async function collectCourse(payload) {
    //console.log('in collect course', payload);
    return request({
        url: `infoservice/courses/${payload.courseId}/favorite`,
        method: 'patch'
    })
}

export async function searchCourse(payload) {
    //console.log('in searching course', payload);
    return request({
        url: `infoservice/courses/${payload.keywords}/${payload.currentPage}/brief`,
        method: 'get',
        params: {
            limit: payload.limit,
        }
    })
}
