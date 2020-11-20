// 获取评论 ！哈哈
import axios from "axios";
// import Qs from  'qs'
import { URL } from './config'

/**
 * 得到课程的信息
 * @param {*} payload 
 */
export async function getCourseInfo(payload) {
    console.log("in get courseInfo", payload)
    var resp = await axios.get(`${URL}Search/SearchCourseUnique`, {
        headers: {
            Authorization: payload.token,
        },
        params: {
            courseId: payload.courseId,
            teacherId: payload.teacherId,
        },
    });
    console.log("after get courseInfo response", resp);
    return resp.data;
}

/**
 * 获取用户收藏的课程信息
 * @param {*} payload {token, userId}
 */
export async function getCollectedCourse(payload) {
    console.log("in get collected course", payload)
    var resp = await axios.get(`${URL}Show/getCollectedCourse`, {
        headers: {
            Authorization: payload.token,
        },
        params: {
            userId: payload.userId,
        },
    });
    console.log("after get collected course", resp);
    return resp.data;
}

/**
 * 取消收藏课程
 * @param {*} payload 
 */
export async function cancelCollect(payload) {
    let resp = await axios.post(`${URL}Course/CancelCollectCourse`, {},
        {
            headers: {
                Authorization: payload.token,
            },
            params: {
                userId: payload.userId,
                courseId: payload.courseId,
                teacherId: payload.teacherId,
            },
        }
    );
    return resp.data
}

/**
 * 收藏课程
 * @param {*} payload {token, userId, courseId, teacherId}
 */
export async function collectCourse(payload) {
    let resp = await axios.post(`${URL}Course/CollectCourse`, {},
        {
            headers: {
                Authorization: payload.token,
            },
            params: {
                userId: payload.userId,
                courseId: payload.courseId,
                teacherId: payload.teacherId,
            },
        }
    );
    return resp.data
}

