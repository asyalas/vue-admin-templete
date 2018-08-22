const getters = ({
  'route/fullPath': state => state.route.fullPath,
  'route/from': state => state.route.from,
  'route/hash': state => state.route.hash,
  'route/meta': state => state.route.meta,
  'route/name': state => state.route.name,
  'route/params': state => state.route.params,
  'route/path': state => state.route.path,
  'route/query': state => state.route.query
})
export default getters
