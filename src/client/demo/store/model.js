
import fetchBy from 'utils/fetchBy'
import setLang from 'utils/setLang'
import getter from './getter'
export default{
  namespace: 'list',
  namespaced: true,
  state: {
    source: [],
    count: 0,
    loading: false
  },
  getters: {
    ...getter
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

      return fetchBy({
        url: '/bar/search?cityId=1',
        method: 'get'
      }).then(res => {
        commit('GET_LIST_SUCCESS', {
          source: res.recordList.map(item => item.valueMap),
          count: Number(res.recordList.length)
        })
      }).finally(() => {
        commit('GET_LIST_FAIL')
      })
    }
  }
}
