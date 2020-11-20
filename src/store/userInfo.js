import { loginUser, registerUser, getUserInfo, modifyUserInfo } from "../services/userService"
import { getHistoryComment } from '../services/commentService'
import { collectCourse, getCollectedCourse, cancelCollect } from '../services/courseService'
import { setCookie, getCookie, removeCookie } from '../utils/utils'
/**
 * 用户登录的数据仓库
 */
export default {
    namespaced: true,
    state: {
        userInfo: null,
        token: null,
        isLoading: false,

        historyComment: null,
        collectedCourse: null,

    },
    mutations: {
        /**
         * 初始化个人信息
         * @param {*} state 指向本仓库的state
         * @param {Object} payload payload以object形式传入，包括nickname，userid，email等
         */
        setUserInfo(state, payload) {
            state.userInfo = payload;
        },

        /**
         * 修改个人信息
         * @param {*} state 
         * @param {*} payload 这里需要和后段接口对应
         */
        modifyUserInfo(state, payload) {
            state.userInfo = {
                degree: payload.degree,
                gender: payload.gender,
                headimageurl: null,
                majorid: payload.majorId,
                nickname: payload.nickname,
                phonenumber: payload.phoneNumber,
                userid: payload.userId,
                year: payload.year,
            }
        },

        /**
         * 修改是否正在加载
         * @param {*} state 指向本仓库的state
         * @param {boolean} payload payload传入true or false
         */
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        /**
         * 设置token
         * @param {*} state 
         * @param {*} payload 
         */
        setToken(state, payload) {
            state.token = payload;
        },

        /**
         * 设置历史评价
         * @param {*} state 
         * @param {*} payload 
         */
        setHistoryComment(state, payload) {
            state.historyComment = payload;
        },

        /**
         * 删除评价
         * @param {*} state 
         * @param {*} payload 
         */
        removeHistoryComment(state, payload) {
            state.historyComment = payload;
        },

        /**
         * 设置用户收藏的课程
         * @param {*} state 
         * @param {*} payload 
         */
        setCollectedCourse(state, payload) {
            state.collectedCourse = payload;
        },

        /**
         * 新加收藏课程
         * @param {*} state 
         * @param {*} payload 
         */
        collectCourse(state, payload){
            state.collectedCourse.push(payload)
        }

        /**
         * 取消收藏课程
         * @param {*} state 
         * @param {*} payload 
         */
        // cancelCollect(state, payload){
            
        // }
        
    },

    actions: {
        /**
         * 登录用户
         * @param {*} context 
         * @param {Object} payload payload传入email，password
         */
        async loginUser(context, payload) {
            context.commit("setIsLoading", true);

            let token = getCookie('TJSPACE-token')
            let userId = getCookie('TJSPACE-userId')
            if (token && userId) {
                // 如果cookie中有保存用户信息，则使用cookie登录
                var resp = await getUserInfo({
                    userId,
                    token
                })
                console.log('after cookie resp', resp)
                if (resp) {
                    //成功获取到了用户信息
                    //继续获取用户的收藏、历史评论
                    var hisComment = await getHistoryComment({
                        userId,
                        token
                    })
                    var colCourse = await getCollectedCourse({
                        userId,
                        token
                    })
                    if (hisComment) {
                        context.commit('setHistoryComment', hisComment.data)
                    }
                    if (colCourse.status == false) {
                        context.commit('setCollectedCourse', [])
                    } else {
                        context.commit('setCollectedCourse', colCourse.collectedcourse)
                    }
                    context.commit("setUserInfo", resp)
                    context.commit("setToken", token)
                }
            }
            else {
                var resp1 = await loginUser(payload);
                console.log(resp1);
                if (resp1.status) {
                    // 登录成功，记录其token
                    context.commit('setToken', "Bearer " + resp1.data1)

                    // 使用token获取用户个人信息
                    var resp2 = await getUserInfo({
                        userId: resp1.data2,
                        token: 'Bearer ' + resp1.data1
                    })

                    if (resp2) {
                        //继续获取用户的收藏、历史评论
                        var hisComment1 = await getHistoryComment({
                            userId: resp1.data2,
                            token: 'Bearer ' + resp1.data1
                        })
                        var colCourse1 = await getCollectedCourse({
                            userId: resp1.data2,
                            token: 'Bearer ' + resp1.data1
                        })
                        // 获取历史信息成功
                        if (hisComment1) {
                            context.commit('setHistoryComment', hisComment1.data)
                        }
                        // console.log('asdasdasdasdasdasdasd',colCourse1)
                        // 获取的收藏信息为空
                        if (colCourse1.status == false) {
                            context.commit('setCollectedCourse', [])
                        } else {
                            context.commit('setCollectedCourse', colCourse1.collectedcourse)
                        }
                        setCookie('TJSPACE-token', 'Bearer ' + resp1.data1, 1)
                        setCookie('TJSPACE-userId', resp1.data2, 1)
                        //成功获取到了用户信息
                        context.commit("setUserInfo", resp2)
                    }
                }
            }

            context.commit("setIsLoading", false);
        },
        /**
         * 退出登录，将数据仓库中的用户信息置空
         * @param {*} context 
         */
        async logoutUser(context) {
            console.log("in store logoutUser")

            context.commit('setToken', null)
            context.commit('setUserInfo', null)

            // 清楚相应的cookie
            removeCookie('TJSPACE-token')
            removeCookie('TJSPACE-userId')

            return true
        },
        /**
         * 注册用户
         * @param {*} context 
         * @param {Object} payload 传入邮箱，密码。用户名，昵称
         */
        async registerUser(context, payload) {
            context.commit("setIsLoading", true);
            var resp = await registerUser(payload)
            console.log("reg user resp:", resp)
            // 注册成功
            if (resp.status) {
                resp = await loginUser({
                    account: {
                        email: payload.email,
                        password: payload.password
                    }
                });
                console.log("login user", resp);
                if (resp.status) {
                    // 登录成功，记录其token
                    context.commit('setToken', "Bearer " + resp.data1)
                    // 使用token获取用户个人信息
                    if (resp.data1) {
                        var resp2 = await getUserInfo({
                            userId: resp.data2,
                            token: 'Bearer ' + resp.data1
                        })
                    }
                    if (resp2) {
                        context.commit("setUserInfo", resp2)
                    }
                }
            }
            context.commit("setIsLoading", false);
            return resp
        },

        /**
         * 修改个人信息
         * @param {*} context 
         * @param {*} payload 传入修改后的个人信息{}
         */
        async modifyUserInfo(context, payload) {
            context.commit("setIsLoading", true);
            console.log('in store modify userInfo ', payload)
            var resp = await modifyUserInfo(payload)
            if (resp.status) {
                //修改个人信息成功
                context.commit('modifyUserInfo', payload)
            }
            context.commit("setIsLoading", false);
            return resp
        },

        async collectCourse(context, payload) {
            // context.commit("setIsLoading", true);
            console.log('in store collect course', payload)
            var resp = await collectCourse(payload)
            if (resp.status) {
                //添加了课程
                var colCourse = await getCollectedCourse(payload)
                // 获取的收藏信息为空
                if (colCourse.status == false) {
                    context.commit('setCollectedCourse', [])
                } else {
                    context.commit('setCollectedCourse', colCourse.collectedcourse)
                }
            }
            // context.commit("setIsLoading", false);
            return resp
        },

        async cancelCollect(context, payload) {
            // context.commit("setIsLoading", true);
            console.log('in store cancel course ', payload)
            var resp = await cancelCollect(payload)
            console.log('asdasdasd', resp)
            if (resp.status) {
                //删除了课程
                var colCourse = await getCollectedCourse(payload)
                // 获取的收藏信息为空
                if (colCourse.status == false) {
                    context.commit('setCollectedCourse', [])
                } else {
                    context.commit('setCollectedCourse', colCourse.collectedcourse)
                }
            }
            // context.commit("setIsLoading", false);
            return resp
        }, 


    },
}
