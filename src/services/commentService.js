// 获取评论 ！哈哈
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
 * 查询个人历史评价信息
 * @param {Object}} payload currentPage
 */
export async function getHistoryComment(payload) {
    console.log('in get history comment', payload)
    return request({
        url: `evlservice/personal/comments/${payload.currentPage}`,
        method: 'get',
        params: {
            limit: payload.limit
        }
    })
}


/**
 * 删除用户评价
 * @param {Object} payload {token, commentId}
 */
export async function deleteComment(payload) {
    console.log('in get delete comment', payload)
    return request({
        url: `evlservice/comments/${payload.commentId}`,
        method: 'delete',
    })
}
