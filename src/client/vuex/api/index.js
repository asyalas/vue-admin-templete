
export const promiseAPi = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve()
  }, 2000)
}).then(() => ({
  code: 1,
  msg: '',
  data: 'txtAsyc success'
}))
