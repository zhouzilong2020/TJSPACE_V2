
import request from "../utils/request"
import axios from "axios";
// import Qs from  'qs'
import { URL } from './config'

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
 * 获取用户收藏的课程信息
 * @param {*} payload {token, userId}
 */
export async function getCollectedCourse(payload) {
    //console.log("in get collected course", payload)
    var resp = await axios.get(`${URL}Show/getCollectedCourse`, {
        headers: {
            Authorization: payload.token,
        },
        params: {
            userId: payload.userId,
        },
    });
    //console.log("after get collected course", resp);
    return resp.data;
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
