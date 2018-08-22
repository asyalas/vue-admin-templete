<script>
import vue from 'vue'
import Switch from 'iview/src/components/Switch'
import Input from 'iview/src/components/Input'
import Button from 'iview/src/components/Button'
import getLang from 'utils/getLang'
export default vue.component('demoHeader', {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    search () {
      this.$emit('search', this.keywords)
    },
    switchChange () {
      this.$emit('switchChange', this.switchBol)
    }
  },
  data () {
    return {
      keywords: '',
      switchBol: getLang() === 'en'
    }
  },
  render (h) {
    return (

      <div class="wrap-title">

        <Input
          class="search"
          v-model={this.keywords}
          search={true}
          placeholder='Enter something...'
          { ...{on: {search: this.search}}} />

        <Button type='primary' {...{on: {click: this.search}}}

        >{this.$t('demo.search')}</Button>

        <svg-icon name='language' class-name='svg'></svg-icon>
        <Switch v-model={this.switchBol} size="large" style="margin-left:20px" {...{on: {'on-change': this.switchChange}}}>
          <span slot="open">{this.$t('demo.English')}</span>
          <span slot="close">{this.$t('demo.Chinese')}</span>
        </Switch>
      </div>
    )
  }
})
</script>
<style lang="scss">

      .wrap-title{
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        .svg{
          width: 30px;
          height: 30px;
          margin-left: 20px
        };
        .search{
          width: 180px;
          margin-right: 15px
        }
      }
</style>
