<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ txt }}</h1>
    <h1>{{ txtAsync }}</h1>
      <div class='flex'>
        <el-input
          class='el-input'
          placeholder="请输入txt的内容"
          v-model="inputTxt"
          clearable
          >
        </el-input>
        <el-button @click="submitTxt" type="primary" >修改</el-button>

      </div>
      <div class='flex'>
        <el-input
          class='el-input'
          placeholder="请输入txtAsync的内容"
          v-model="inputTxtAsync"
          clearable
          >
        </el-input>
        <el-button
        @click="submitAsyncTxt"
        type="primary"
        :loading="loading"
        >修改</el-button>

      </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'vuex',
  data () {
    return {
      inputTxtAsync: '',
      inputTxt: '',
      msg: 'Welcome to vuex'
    }
  },
  computed: {
    ...mapGetters({
      txt: 'user.txt',
      txtAsync: 'user.txtAsync',
      loading: 'user.loading'
    })
  },
  methods: {
    submitTxt () {
      if (!this.inputTxt) {
        return this.$message({
          message: '输入值不能为空',
          type: 'error'
        })
      }
      this.$store.dispatch('changeTxt', { txt: this.inputTxt })
    },
    submitAsyncTxt () {
      if (!this.inputTxtAsync) {
        return this.$message({
          message: '输入值不能为空',
          type: 'error'
        })
      }
      this.$store.dispatch('changeAsyncTxt', { txt: this.inputTxtAsync })
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
.flex{
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.el-input{
  width: 400px;
  margin-right: 20px

}
</style>
