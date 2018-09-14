
const [,,lang] = process.argv
module.exports = {
  less:'red',
  sass:'blue',
  stylus:'yellow',
  'lang-env':lang || 'all',
};