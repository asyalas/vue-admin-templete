import { promiseAPi } from '../api'
import getter from './getter'
const store = {
  state: {
    txt: 'i am txt',
    txtAsync: 'i am txtAsync'
  },

  mutations: {
    CHANGE_TXT: (state, txt) => {
      state.txt = txt
    }
  },

  actions: {
    // 异步
    txtPromise ({ commit }, {type}) {
      return new Promise((resolve, reject) => {
        promiseAPi({type}).then(response => {
          commit('CHANGE_TXT', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export {getter, store}
