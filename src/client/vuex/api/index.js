
export const promiseAPi = () => new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve()
  }, 1000)
}).then(() => ({
  code: 1,
  msg: '',
  data: 'success,the value is  '
}))
