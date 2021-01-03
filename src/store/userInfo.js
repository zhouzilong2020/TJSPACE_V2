import { loginUser, registerUser, getUserInfo } from "../services/userService"
import { getCookie, removeCookie, setCookie } from '../utils/utils'

/**
 * 用户登录的数据仓库
 */
export default {
    namespaced: true,
    state: {
        userInfo: null,
        isLoading: false,
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
                avatar: payload.avatar,
                majorId: payload.majorId,
                majorName:payload.majorName,
                nickname: payload.nickname,
                phoneNumber: payload.phoneNumber,
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
         * 设置历史发帖
         * @param {*} state 
         * @param {*} payload 
         */
        setHistoryBBS(state, payload) {
            state.historyBBS = payload;
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
        collectCourse(state, payload) {
            state.collectedCourse.push(payload)
        }

    },

    actions: {
        /**
         * 用邮箱登录用户
         * @param {*} context 
         * @param {Object} payload payload传入email，password，phoneNumber，remember
         */
        async loginUser(context, payload) {
            context.commit("setIsLoading", true);
            let token = getCookie('TJSPACE_token')
            if (token) {
                // 如果cookie中有保存用户信息，则使用cookie登录
                getUserInfo().then((resp) => {
                    ////console.log('after cookie resp', resp)
                    context.commit("setUserInfo", resp.data)
                    context.commit("setToken", token)
                    setCookie('TJSPACE_userId', resp.data.nickname)
                })
            }
            else {
                loginUser(payload.account).then(async (resp1) => {
                    ////console.log("no cookie",resp1);
                    if (resp1.success) {
                        // 登录成功，用户选择记住账号
                        //console.log(payload.remember)
                        if (payload.remember) {
                            ////console.log("remember")
                            localStorage.setItem('TJSPACE-email', payload.account.email)
                        }
                        //如果用户没有选择记住用户账号
                        if (!payload.remember) {
                            localStorage.removeItem('TJSPACE-email')
                        }
                        // 登录成功，记录其token
                        context.commit("setToken", resp1.data.token)
                        ////console.log("setToken",resp1.data.token);
                        // 使用token获取用户个人信息

                        await getUserInfo().then((resp2) => {
                            //成功获取到了用户信息
                            context.commit("setUserInfo", resp2.data)
                        })
                    }
                })
            }
            context.commit("setIsLoading", false);
        },

        /**
         * 退出登录，将数据仓库中的用户信息置空
         * @param {*} context 
         */
        async logoutUser(context) {
            ////console.log("in store logoutUser")

            context.commit('setToken', "")
            context.commit('setUserInfo', null)

            // 清除相应的cookie
            removeCookie('TJSPACE_token')
        },
        /**
         * 注册用户
         * @param {*} context 
         * @param {Object} payload 传入邮箱，密码。用户名，昵称
         */
        async registerUser(context, payload) {
            context.commit("setIsLoading", true);
            var resp = await registerUser(payload)
            ////console.log("reg user resp:", resp)
            // 注册成功
            if (resp.success) {
                var resp1 = await loginUser({
                    email: payload.email,
                    password: payload.password
                });
                ////console.log("login user", resp1);
                if (resp1.success) {
                    // 登录成功，记录其token
                    context.commit('setToken', resp1.data.token)
                    // 使用token获取用户个人信息
                    await getUserInfo().then((resp2) => {
                        //成功获取到了用户信息
                        context.commit("setUserInfo", resp2.data)
                        context.commit("setIsLoading", false);
                        return resp;
                    })
                }
            }
            else {
                return resp;
            }
        },
    },
}
