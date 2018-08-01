<template>
  <div class="wrap">
    <div class="wrap-container">
      <div class="wrap-title">

        <Input class="search" v-model="keywords" search placeholder="Enter something..." @search="search"/>
        <Button type="primary" @click="search">Primary</Button>
      </div>
      <div class="table-wrap">
        <Table
          border
          :columns="columns"
          class="table"
          :data="source"
          :loading="loading"
        ></Table>
        <div class="page-wrap">
          <Page :total="count" @on-change="change" class="page" />
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
const defaultOpt = {
  keywords: '',
  pageNum: 1,
  // type: 1,
  pageSize: 10
}
export default {
  data () {
    return {
      columns: [
        {
          title: '应用项目名称',
          key: 'name'
        },
        {
          title: '收单通道',
          key: 'channelName'
        },
        {
          title: 'AppID',
          key: 'appId'
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
                    this.show(params)
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
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      keywords: ''
    }
  },
  computed: {
    ...mapGetters({
      source: 'list.source',
      loading: 'list.loading',
      count: 'list.count'
    })
  },

  created (p) {
    this.getList({keywords: this.keywords})
  },
  methods: {
    show ({row}) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${row.name}`
      })
    },
    remove (index) {
      this.data.splice(index, 1)
    },
    getList (opt = {}) {
      this.$store.dispatch('getList', {...defaultOpt, ...opt})
    },
    search () {
      this.getList({keywords: this.keywords})
    },
    change (pageNum) {
      this.getList({pageNum, keywords: this.keywords})
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
    width: 100%;
    position: relative;
    padding: 15px 20%;
    .wrap-container{
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,.15);
      padding:15px;
      box-sizing: border-box;
      .wrap-title{
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        .search{
          width: 180px;
          margin-right: 15px
        }
      }
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
</style>
