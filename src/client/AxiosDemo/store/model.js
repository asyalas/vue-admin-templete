
import fetchBy from 'utils/fetchBy'
export default{
  namespace: 'list',
  state: {
    source: [],
    count: 0,
    loading: false
  },

  mutations: {
    CHANGE_TXT: (state, {txt}) => {
      state.txt = txt
    },
    GET_LIST_START: (state) => {
      state.loading = true
    },
    GET_LIST_SUCCESS: (state, data) => {
      state.source = data.source
      state.count = data.count
    },
    GET_LIST_FAIL: (state) => {
      state.loading = false
    }
  },

  actions: {

    // 异步
    getList ({ commit }, data) {
      commit('GET_LIST_START')
      const params = {
        ...data
      }
      return fetchBy({
        url: '/webapi/financial/web/tms/1.0/?service=AppProject.getAppProjectList',
        data: params
      }).then(res => {
        commit('GET_LIST_SUCCESS', {
          source: res.data.result,
          count: Number(res.data.count)
        })
      }).finally(() => {
        commit('GET_LIST_FAIL')
      })
    }
  }
}
