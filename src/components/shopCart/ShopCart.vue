<template>
<div class="shopcart">
  <div class="content">
    <div class="left" @click="toggleList">
      <div class="log" :class="{highLight: totalcount>0}">
        <span class="icon-cart icon-shopping_cart"></span>
        <div class="food-num" v-if="totalcount">{{totalcount}}</div>
      </div>
      <div class="price" :class="{highLightPrice: totalPrice>0}">￥{{totalPrice}}</div>
      <div class="line">|</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
    </div>
    <div class="right" :class="{pay:this.totalPrice >= this.minPrice}">{{payDesc}}</div>
    <transition name="shop-list">
      <div class="shop-list" v-show="listShow">
        <div class="shop-head">
          <h1>购物车</h1>
          <span @click="clearCart">清空</span>
        </div>
        <div class="select-list" ref="listContent">
          <ul>
            <li v-for="(food, index) of selectFood" :key="index" class="border-1px">
              <div class="list-left">
                <span class="foodName">{{food.name}}</span>
              </div>
              <div class="list-right">
                <span class="price">￥{{food.price*food.count}}</span>
                <div class="cartCtrl">
                  <cart-count-ctrl :food="food"></cart-count-ctrl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import CartCountCtrl from '@/components/cartCountCtrl/cartCountCtrl'
import BScroll from 'better-scroll'
export default {
  name: 'ShopCart',
  props: {
    selectFood: {
      type: Array,
      default () {
        return [
          {price: 10, count: 1}
        ]
      }
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  data () {
    return {
      fold: false
    }
  },
  components: {
    CartCountCtrl
  },
  computed: {
    totalPrice () {
      let price = 0
      this.selectFood.forEach((item, index) => {
        price += item.price * item.count
      })
      return price
    },
    totalcount () {
      let count = 0
      this.selectFood.forEach((item, index) => {
        count += item.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let price = this.minPrice - this.totalPrice
        return `还差￥${price}元起送`
      } else {
        return `结算`
      }
    },
    listShow () {
      if (!this.totalcount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalcount) {
        return 0
      }
      this.fold = !this.fold
    },
    clearCart () {
      for (let food of this.selectFood) {
        food.count = 0
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .shop-list-enter-active, .shop-list-leave-active
    transition: all .5s;
  .shop-list-enter,.shop-list-leave-to
    transform translateY(100%)
  .shopcart
    position fixed
    bottom 0
    width 100%
    left 0
    height .96rem
    z-index 50
    .content
      display flex
      height 100%
      background-color #141d27
    .left
      flex 1
      display flex
      .log
        width .88rem
        height .88rem
        border-radius 50%
        border .12rem solid #141d27
        background-color #2B333B
        position relative
        bottom .16rem
        margin-left .36rem
        text-align center
        position relative
        .icon-cart
          font-size .48rem
          color rgba(255,255,255,.4)
          line-height .88rem
        .food-num
          position absolute
          top -0.15rem
          right -0.15rem
          padding 0 .06rem
          line-height .32rem
          min-width .4rem
          color #fff
          font-weight 700
          font-size .18rem
          background-color rgb(240,20,20)
          box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
          border-radius .16rem
      .highLight
        background-color #00a0dc
        .icon-cart
          color white
      .line
        line-height .96rem
        font-size .48rem
      .price,.desc
        line-height .96rem
        color rgba(255,255,255,.4)
        font-weight 700
        font-size .32rem
        padding 0 .24rem
      .highLightPrice
        color #fff
      .desc
        flex 1
        font-weight 500
        font-size .24rem
    .right
      width 2rem
      background-color #2B333B
      line-height .96rem
      text-align center
      font-weight 700
      color rgba(255,255,255,.4)
      font-size .24rem
      &.pay
       color #fff
       background-color #009d3a
    .shop-list
      position absolute
      bottom .96rem
      left 0
      box-sizing border-box
      width 100%
      z-index -1
      .shop-head
        height .8rem
        background-color #f3f5f7
        position relative
        border-bottom 1px solid rgba(7,17,27,.1)
        h1
          font-size .28rem
          font-weight 200
          color rgb(7,17,27)
          line-height .8rem
          padding 0 .18rem
        span
          position absolute
          right 0
          top 0
          text-align right
          color #36B2E2
          line-height .8rem
          font-size .24rem
          padding 0 .18rem
      .select-list
        max-height 3.7rem
        overflow hidden
        background-color #fff
      .select-list>ul>li
        height .9rem
        display flex
        background-color #fff
        border-1px(rgba(7,17,27,.1))
        .list-left
          flex 1
          text-overflow ellipsis
          white-space nowrap
          overflow hidden
          .foodName
            font-weight 700
            line-height .9rem
            color rgb(7,17,27)
            font-size .28rem
            padding 0 .18rem
        .list-right
          min-width 2.7rem
          .price
            padding-left .36rem
            font-size .2rem/.28rem
            font-weight normal/700
            color rgb(240,20,20)
            line-height .9rem
            display inline-block
          .cartCtrl
            margin-right .18rem
            margin-top .24rem
            float right
</style>
