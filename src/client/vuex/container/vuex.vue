<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ txt }}</h1>
    <h1>{{ txtAsync }}</h1>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'vuex',
  data () {
    return {
      msg: 'Welcome to vuex'
    }
  },
  computed: {
    ...mapGetters([
      'txt',
      'txtAsync'
    ])
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
