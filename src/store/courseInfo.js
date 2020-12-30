/**
 * 课程信息的数据仓库
 */
export default {
    namespaced: true,
    state: {
        courseInfo: null,
        isLoading: false,
        searchText : '',
    },
    mutations: {
      setCourseInfo(state, payload) {
        state.courseInfo = payload
      },
      setSearchText(state, payload) {
        state.searchText = payload
      }
    },
}
