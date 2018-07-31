import { promiseAPi } from '../api'
export default {
  namespace: 'user',
  state: {
    txt: 'i am txt',
    txtAsync: 'i am txtAsync',
    loading: false
  },

  mutations: {
    CHANGE_TXT: (state, {txt}) => {
      state.txt = txt
    },
    CHANGE_ASYNC_TXT_START: (state) => {
      state.loading = true
    },
    CHANGE_ASYNC_TXT: (state, {txt}) => {
      state.txtAsync = txt
    },
    CHANGE_ASYNC_FINALLY: (state) => {
      state.loading = false
    }
  },

  actions: {
    changeTxt ({ commit }, {txt}) {
      commit('CHANGE_TXT', {txt})
    },
    // 异步
    changeAsyncTxt ({ commit }, {txt}) {
      commit('CHANGE_ASYNC_TXT_START')
      return new Promise((resolve, reject) => {
        promiseAPi().then(response => {
          commit('CHANGE_ASYNC_TXT', {txt: response.data + txt})
          resolve()
        }).catch(error => {
          reject(error)
        }).finally(() => {
          commit('CHANGE_ASYNC_FINALLY')
        })
      })
    }
  }
}
