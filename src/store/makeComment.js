import {makeComment} from "../services/makeCommentService"

export default{
    namespaced: true,
    state:{
        isLoading:false,
    },
    mutations:{
        setIsLoading(state,payload){
            state.isLoading=payload;
        },
    },
    actions:{
        async makeComment(context,payload){
            context.commit("setIsLoading", true); 
            var resp = await makeComment(payload);
            context.commit("setIsLoading", false); 
            return resp;
        }
    }

}