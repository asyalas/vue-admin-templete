const getters = (namespace) => ({
  source: state => state[namespace].source,
  loading: state => state[namespace].loading,
  count: state => state[namespace].count
})
export default getters
