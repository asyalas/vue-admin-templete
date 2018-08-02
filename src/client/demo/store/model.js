
import fetchBy from 'utils/fetchBy'
import setLang from 'utils/setLang'
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
    // 设置语言
    setLang ({ commit }, {lang}) {
      new Promise((resolve) => {
        setLang(lang)
        resolve()
      }).then(() => {
        location.reload()
      })
    },
    // 异步
    getList ({ commit }, data) {
      commit('GET_LIST_START')
      const params = {
        ...data
      }
      return fetchBy({
        url: '/webapi/financial/web/tms/1.0/?service=AppProject.getAppProjectList',
        // url: '/webapi/stock/web/stock/1.0/?service=Product.getERPProductList',
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
