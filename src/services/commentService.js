// 获取评论 ！哈哈
import axios from "axios";
// import Qs from  'qs'
import { URL } from './config'
import request from '../utils/request'


/**
 * 分页查询课程评价
 */
export async function getComment(payload) {
    console.log("in get comment", payload)

    return request({
        url: `evlservice/courses/${payload.courseId}/comments/${payload.currentPage}`,
        method: 'get',
        params: {
            limit: payload.limit
        }
    })
}

/**
 * 用户发表对课程评价的评价
 * @param {Object} payload userID, commentID, type(1 有用， 2 没用)
 */
export async function evaluateComment(payload) {
    console.log("in evaluate comment", payload)
    return request({
        method: 'patch',
        url: `evlservice/comments/${payload.commentId}/attitude`,
        params: payload,
    })
}

/**
 * 获取用户对当前课程评价的历史评价
 * @param {Object} payload 传入 userId， commentId 
 */
export async function getEvaluate(payload) {
    console.log("in getEvaluate ", payload)
    var resp = await axios.get(`${URL}Comment/CanEvaluate`, {
        headers: {
            Authorization: payload.token,
        },
        params: {
            userId: payload.userId,
            commentId: payload.commentId,
        },
    });
    console.log("in getEvaluate response", resp);
    return resp.data;

}



/**
 * 
 * 发表对课程的评价
 * @param {*} payload  
 */
export async function makeComment(payload) {
    console.log('in commit comment', payload)
    return request({
        url: `evlservice/courses/${payload.courseId}/comment/`,
        method: "post",
        data: payload,
    })

}



/**
 * 返回历史评论信息
 * @param {Object}} payload {token, userId}
 */
export async function getHistoryComment(payload) {
    console.log('in get history comment', payload)
    let resp = await axios.get(`${URL}Show/personalcomment`, {
        headers: {
            Authorization: payload.token,
        },
        params: {
            userId: payload.userId
        }
    })
    console.log('after getting history comment ', resp)
    return resp.data
}


/**
 * 删除用户评价
 * @param {Object} payload {token, commentId}
 */
export async function deleteComment(payload) {
    console.log('in get delete comment', payload)
    let resp = await axios.post(`${URL}Show/personalcomment`, {},
        {
            headers: {
                Authorization: payload.token,
            },
            params: {
                userId: payload.commentId
            }
        })
    console.log('after delete history comment ', resp)
    return resp.data
}
