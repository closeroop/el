<template>
    <div>
      <store-header :seller="seller"></store-header>
      <div class="tab border-1px">
        <router-link class="tab-item" tag="div" to="goods" >商品</router-link>
        <router-link class="tab-item" tag="div" to="comment" >评价</router-link>
        <router-link class="tab-item" tag="div" to="store">商家</router-link>
      </div>
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
</template>

<script>
import StoreHeader from './header/Header'
import StoreTab from './tabGoods/TabGoods'
import axios from 'axios'
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  name: 'StoreHome',
  components: {
    StoreHeader,
    StoreTab
  },
  methods: {
    getHeaderInfo () {
      axios.get('/api/seller.json').then(this.showHeaderInfo)
    },
    showHeaderInfo (res) {
      res = res.data
      if (res.ret === ERR_OK) {
        this.seller = res.seller
      }
      console.log(res)
    }
  },
  mounted () {
    this.getHeaderInfo()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .tab
    line-height .8rem
    display flex
    border-1px(rgba(7,17,27,.1))
    .tab-item
      /*width 33.33%*/ // flex 1 代替均分
      flex 1
      text-align center
      color rgb(77,85,93)
      font-size .32rem
    .active
       color #ef251d
</style>
