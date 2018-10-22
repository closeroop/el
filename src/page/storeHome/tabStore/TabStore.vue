<template>
  <div class="seller" ref="infoScroll">
    <div class="seller-content">
      <div class="overview">
        <div class="o-top border-1px">
          <h1>{{seller.name}}</h1>
          <star :size="36" :score="seller.score" class="stars"></star>
          <span>月售{{seller.sellCount}}单</span>
        </div>
        <div class="o-bottom">
          <div>
            <h3>起送价</h3>
            <span>{{seller.minPrice}}<mark>元</mark></span>
          </div>
          <div><h3>商家配送</h3><span>{{seller.deliveryPrice}}<mark>元</mark></span></div>
          <div><h3>平均配送时间</h3><span>{{seller.deliveryTime}}<mark>元</mark></span></div>
        </div>
        <div class="like" @click.prevent="addLike">
          <i class="icon-favorite" :class="{'on': like}"></i>
          <span>收藏</span>
        </div>
      </div>
      <div class="geLan"></div>
      <div class="active border-1px">
         <div class="desc">
           <h1>公告与活动</h1>
           <p>{{seller.bulletin}}</p>
         </div>
        <ul v-if="seller.supports" class="support">
          <li class="support-item border-1px" v-for="(item, index) of seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="geLan"></div>
      <div class="pic">
        <h1>商家实景</h1>
      </div>
      <div class="geLan"></div>
      <div class="info">
        <h1>商家信息</h1>
        <ul>
          <li v-for="(item, index) of seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/Star'
import BScroll from 'better-scroll'
export default {
  name: 'TabStore',
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      like: false
    }
  },
  components: {
    Star
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.infoScroll, {click: true})
  },
  methods: {
    addLike () {
      this.like = !this.like
      console.log(this.like)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  h1
    font-size .28rem
    color rgb(7,17,27)
    line-height .28rem
    padding-bottom .16rem
  .geLan
    height .24rem
    background-color #f3f5f7
    border-top 1px solid #EEF0F2
    border-bottom 1px solid #EEF0F2
  .seller
    position absolute
    top 3.5rem
    bottom 0
    width 100%
    overflow hidden
    .overview
      padding 0 .36rem
      position relative
      .o-top
        padding .36rem 0
        border-1px(rgba(7,17,27,.1))
        .stars
          display inline-block
          vertical-align middle
        span
          font-size .2rem
          color rgb(77,85,93)
          line-height .36rem
          padding-left .24rem
          font-weight 400
      .o-bottom
        display flex
        padding .36rem 0
      .o-bottom>div+div
        border-left 1px solid rgba(7,17,27,.1)
      .o-bottom>div
        flex 1
        text-align center
        h3
          font-size .2rem
          color rgb(147,153,159)
          line-height .2rem
          display inline-block
          width 100%
          margin-bottom .06rem
        span
          font-size .48rem/.2rem
          font-weight 300
          color rgb(7,17,27)
          line-height .48rem
        mark
          font-size .18rem
      .like
        position absolute
        top .36rem
        right .5rem
        width .5rem
        text-align center
        i
          font-size .48rem
          line-height .48rem
          &.on
            color red
        span
          font-size .2rem
          color rgb(77,85,93)
          line-height .2rem
    .active
      padding .36rem .36rem 0
      .desc
        border-1px(rgba(7,17,27,.1))
        padding-bottom .32rem
        h1
          font-size .28rem
          color rgb(7,17,27)
          line-height .28rem
          padding-bottom .16rem
        p
          padding 0 .24rem
          color rgb(240,20,20)
          font-weight 400
          line-height .48rem
          font-size .24rem
      .support
        .support-item
          padding .32rem .24rem
          font-size 0
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border none
          .icon
            display inline-block
            width .32rem
            height .32rem
            vertical-align top
            margin-right .12rem
            background-size cover
            &.decrease
              bg-image('./img/decrease_3')
            &.discount
              bg-image('./img/discount_3')
            &.guarantee
              bg-image('./img/guarantee_3')
            &.invoice
              bg-image('./img/invoice_3')
            &.special
              bg-image('./img/special_3')
          .text
            line-height .32rem
            font-size .24rem
            font-weight 400
            color #4d4d4d
    .pic
      padding .36rem
    .info
      padding .36rem
      li
        padding .36rem .24rem
        border-1px(rgba(7,17,27,.1))
        font-size .24rem
        font-weight 400
        color rgb(7,17,27)
        line-height .32rem
        &:last-child
          border none
</style>
