// comment的仓库数据
import {getComment} from "../services/commentService"

export default{
    namespaced: true, 
    state: {
        // 数据仓库中存放的数据
        comments: [],
        courseID: '',
        isLoading: false,
    },
    mutations: {
        // 数据进行变换的函数, 这样写是为了方便调试, 可以在chrome中使用插件看到数据的变化
        setCourseID(state, payload) {
            state.courseID = payload;
        },
        setIsLoading(state, payload){
            state.isLoading = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        },
    },
    actions: {
        // action是具体的变换逻辑, 在任何地方变换都应该调用actions来操作数据仓库
        
        // payload传入一个token和courseID
        async getComment(context, payload){
            context.commit("setIsLoading", true); 
            context.commit("setCourseID", payload.courseID)
            var resp = await getComment(payload);
            if(resp.status){
                context.commit("setComments", resp.data);
            }
            context.commit("setIsLoading", false);
        }
    },
}
