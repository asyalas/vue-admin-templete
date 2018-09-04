<template>
  <div class="wrap">
    <div class="wrap-container">
      <demoHeader
      @switchChange='switchChange'
      @search='search'
      ></demoHeader>
      <div class="table-wrap dome-list">
        <Table
          border
          :columns="columns"
          class="table"
          :data="source"
          :loading="loading"
        ></Table>
        <div class="page-wrap">
          <Page :total="count" @on-change="change" class="page" show-sizer />
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'

import demoHeader from '../components/header'

const defaultOpt = {
  keywords: '',
  pageNum: 1,
  // type: 1,
  pageSize: 10
}
export default {
  components: {
    demoHeader
  },
  data () {
    const that = this
    return {
      columns: [
        {
          title: '搜索项',
          key: 'suggestkeyword'
        },
        {
          title: 'id_',
          key: 'id_'
        },
        {
          title: 'location',
          key: 'location'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          /**
           * createElement
           * @param {String | Object | Function} 可以是组件、标签（div）、函数 类似React.createElement
           * @param {Object}  一个对应属性的数据对象
           * @param {String | Array} 子节点(VNodes). 可选项.
           * **/
          render: (createElement, params) => {
            return createElement('div', [
              createElement('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    that.show(params)
                  }
                }
              }, 'View'),
              createElement('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    that.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('list', {
      source: 'source',
      loading: 'loading',
      count: 'count'
    })
  },

  created (p) {
    this.getList({keywords: this.keywords})
  },
  mounted () {
    console.log(this)
  },
  methods: {
    switchChange (bol) {
      const lang = bol ? 'en' : 'zh'
      this.$store.dispatch('list/setLang', {lang})
    },
    show ({row}) {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>Content of dialog</p><p>Content of dialog</p>',
        onOk: () => {
          this.$Message.info('Clicked ok')
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    remove (index) {
      this.data.splice(index, 1)
    },
    getList (opt = {}) {
      this.$store.dispatch('list/getList', {...defaultOpt, ...opt})
    },
    search (val) {
      this.getList({keywords: val})
    },
    change (pageNum) {
      this.getList({pageNum, keywords: this.keywords})
    }
  }
}
</script>
<style lang="scss">

@import '~styles/media.scss';
.wrap{
    width: 100%;
    position: relative;
    padding: 15px 20%;
    .wrap-container{
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,.15);
      padding:15px;
      box-sizing: border-box;
    }
}
.page-wrap{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  .page{
    display: inline-block
  }
}
.dome-list {

    // @include media(xs) {font-size: 6px}
    // @include media(s) {font-size: 5px}
    // @include media(m) {font-size: 4px}
    // @include media(xm) {font-size: 3px}
    // @include media(l) {font-size: 2px}
    // @include media(xl) {font-size: 1px}
}
</style>
