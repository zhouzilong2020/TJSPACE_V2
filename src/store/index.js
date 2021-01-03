import vuex from "vuex";
import Vue from "vue";
import userInfo from "./userInfo";
import comments from "./comments"
import infoModify from './infoModify'
import courseInfo from './courseInfo'
Vue.use(vuex);

// 一个仓库对象，存放所有的共享数据
var store = new vuex.Store({
    modules: {
        userInfo, //userInfo 的名字
        comments,
        infoModify,
        courseInfo,
   },
});

export default store;