import {infoModify} from "../services/infoModifyService"

export default{
    namespaced: true, 
    state: {
        isLoading: false,
    },
    mutations: {
        setIsLoading(state, payload){
            state.isLoading = payload;
        },
    },
    actions: {
        // payload传入一个token和courseID
        async infoModify(context, payload){
            context.commit("setIsLoading", true); 
            var resp = await infoModify(payload);
            context.commit("setIsLoading", false);
            return resp;
        }
    },
}