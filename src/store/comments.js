// comment的仓库数据
import {getComment} from "../services/commentService"

export default{
    namespaced: true, 
    state: {
        comments: [],
        courseID: '',
        isLoading: false,
    },
    mutations: {
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
