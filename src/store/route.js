export default{
    namespaced: true, 

    state: {
      routes:null,
      
    },
    mutations: {
        setRoutes(state, payload){
          state.routes = payload;
        },
    },
}