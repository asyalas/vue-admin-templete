<template>
  <div >
    <div >
      <div >
        <img  :src="notFindPng"  class='img' alt="404">
        <div >

          <a href="/" class="txt">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notFindPng from 'images/404.png'
export default {
  name: 'page404',
  data () {
    return {
      notFindPng
    }
  }
}
</script>
<style lang="css">
  .img{
    width:400px;
  }
  .txt{
      display: block;
      margin: 10px auto 0 ;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      text-decoration: none;

  }
</style>
