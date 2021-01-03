import VueRouter from "vue-router"
import Vue from "vue"
import config from "./config"
import { checkCookie } from '../utils/utils'
// 安装vuerouter
Vue.use(VueRouter)
// 路由对象
var router = new VueRouter(config);
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (checkCookie()) { // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/',
      })
    }
  }
  else {
    next();
  }
})

export default router;