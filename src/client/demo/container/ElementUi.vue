<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
  </div>
</template>

<script>
export default {
  name: 'ElementUi',
  data () {
    return {
      msg: 'Welcome to ElementUi'
    }
  },
  methods: {
    open () {
      this.$message('这是一条消息提示')
    },
    open2 () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },

    open3 () {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },

    open4 () {
      this.$message.error('错了哦，这是一条错误消息')
    }
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
