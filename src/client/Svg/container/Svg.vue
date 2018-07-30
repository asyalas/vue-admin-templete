<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg-icon  name="language" class-name="big-svg" />
  </div>
</template>

<script>
export default {
  name: 'svg-demo',
  data () {
    return {
      msg: 'Welcome to Svg'
    }
  }
}
</script>
<style lang="less" scoped>
.hello{

  .big-svg{
    width: 100px;
    height: 100px;
  }
}
</style>
