<template>
  <div class="header">
   <div class="content-wrapper">
     <div class="avatar">
       <img :src="seller.avatar" alt="">
     </div>
     <div class="content">
       <div class="title">
         <span class="brand"></span>
         <span class="seller">{{seller.name}}</span>
       </div>
       <div class="desc">
         {{seller.description}}/{{seller.deliveryTime}}分钟送达
       </div>
       <div class="active" v-if="seller.supports">
         <span class="icon" :class="this.classMap[seller.supports[0].type]"></span>
         <span>{{seller.supports[0].description}}</span>
       </div>
     </div>
     <div class="support-count" v-if="seller.supports" @click="detailShow">
       {{seller.supports.length}}个
       <i class="icon-keyboard_arrow_right"></i>
     </div>
   </div>
    <div class="announcement" @click="detailShow">
      <span class="brand"></span><span class="desc">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="backImg">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="showDetail" @click="closeDetail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1>{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="support">
              <li class="support-item" v-for="(item, index) of seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from '@/components/star/Star'
export default {
  name: 'Header',
  props: {
    seller: Object
  },
  data () {
    return {
      classMap: [],
      showDetail: false
    }
  },
  components: {
    Star
  },
  methods: {
    detailShow () {
      this.showDetail = true
    },
    closeDetail () {
      this.showDetail = false
    }
  },
  mounted () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .fade-enter, .fade-leave-to
    opacity 0
  .fade-enter-active, .fade-leave-active
    transition all .5s
  .header
    height 0
    overflow hidden
    padding-bottom 2.7rem
    background-color rgba(7,17,27,.4)
    position relative
    .content-wrapper
      height 1.28rem
      margin .48rem .32rem .36rem .48rem
      display flex
      position relative
      .avatar
        height 1.28rem
        width 1.28rem
        vertical-align top
        img
          width 100%
      .content
        flex 1
        margin-left .32rem
        color #fff
        .title
          font-size .32rem
          font-weight bold
          line-height .32rem
          margin-top .08rem
          .brand
            display inline-block
            width .6rem
            height .32rem
            bg-image("./img/brand")
            background-size cover
            background-position center
            vertical-align top
        .desc
          font-size .24rem
          font-weight 400
          line-height .24rem
          margin .16rem 0 .2rem
        .active
          font-size .2rem
          font-weight 400
          line-height .25rem
          .icon
            display inline-block
            width .24rem
            height .24rem
            background-size cover
            background-position center
            vertical-align middle
            &.decrease
              bg-image('./img/decrease_1')
            &.discount
              bg-image('./img/discount_1')
            &.guarantee
              bg-image('./img/guarantee_1')
            &.invoice
              bg-image('./img/invoice_1')
            &.special
              bg-image('./img/special_1')
      .support-count
        position absolute
        bottom 0
        right 0
        font-size .2rem
        color #fff
        font-weight 400
        line-height .24rem
        background-color rgba(0,0,0,.2)
        padding .14rem .16rem
        border-radius .28rem
        vertical-align middle
        i
          line-height .24rem
    .announcement
      height .56rem
      padding  0 .48rem
      line-height .56rem
      font-weight 200
      font-size .2rem
      color #fff
      background-color rgba(7,17,27,.1)
      display flex
      .desc
        //display inline-block
        flex 1
        //width 85%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        vertical-align top
        padding  0 .08rem
        box-sizing border-box
      i
        line-height .56rem
      .brand
        //display inline-block
        width .6rem
        height .32rem
        margin-top .12rem
        bg-image('./img/bulletin')
        background-size cover
    .backImg
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      z-index -1
      img
        width 100%
        filter blur(5px)
    .detail
      position: fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background-color rgba(7,17,27,.8)
      backdrop-filter blur(.2rem)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 1.28rem
          padding-bottom 1.28rem
          font-size .24rem
          line-height .48rem
          color #fff
          h1
            text-align center
            font-size .32rem
            font-weight 700
          .star-wrapper
            height .48rem
            margin .36rem 0
            text-align center
          .title
            display flex
            width 80%
            margin .6rem auto .48rem
            .line
              flex 1
              position relative
              top -0.2rem
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              color white
              font-size .32rem
              padding 0 .24rem
              font-weight 700
          .support
              width 80%
              margin 0 auto
              .support-item
                padding 0 .24rem
                margin-bottom .24rem
                font-size 0
                &:last-child
                  margin-bottom 0
                .icon
                  display inline-block
                  width .32rem
                  height .32rem
                  vertical-align top
                  margin-right .12rem
                  background-size cover
                  &.decrease
                    bg-image('./img/decrease_2')
                  &.discount
                    bg-image('./img/discount_2')
                  &.guarantee
                    bg-image('./img/guarantee_2')
                  &.invoice
                    bg-image('./img/invoice_2')
                  &.special
                    bg-image('./img/special_2')
                .text
                  line-height .24rem
                  font-size .24rem
          .bulletin
            padding 0 10%
            .content
              line-height .48rem
              font-size .24rem
              font-weight 200
      .detail-close
        position relative
        width .64rem
        height .64rem
        margin -1.28rem auto 0 auto
        clear both
        font-size .64rem
        color whitesmoke
</style>
