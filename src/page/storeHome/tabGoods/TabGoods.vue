<template>
  <div class="goods">
    <div class="menu-wrapper" ref="asideScroll">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item border-1px" :class="{'current':
        index === currentIndex}" @click="goFoods(index,$event)">
          <div class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <li v-for="(items, index) in goods" :key="index" class="food-list food-list-hook">
          <h2 class="title">{{items.name}}</h2>
          <ul>
            <li v-for="(item, index) in items.foods" :key="index" class="border-1px">
              <div class="icon" @click.prevent="selectSingleFood(item)">
                <img :src="item.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc" v-if="item.info">{{item.info}}</p>
                <div class="extra">
                  <span>月售{{item.sellCount}}</span>
                  <span>好评率{{item.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{item.price}}</span>
                  <span v-if="item.oldPrice" class="oldPrice">￥{{item.oldPrice}}</span>
                </div>
                <div class="btn-wrapper">
                  <cart-count-ctrl :food="item"></cart-count-ctrl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFood="selectFoods"></shop-cart>
    <food :food="singleFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import ShopCart from '@/components/shopCart/ShopCart'
import CartCountCtrl from '@/components/cartCountCtrl/cartCountCtrl'
import Food from './Food/food'
const ERR_OK = 0
export default {
  name: 'TabGoods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      classMap: [],
      listHeight: [],
      scrollY: 0,
      singleFood: {}
    }
  },
  components: {
    ShopCart,
    CartCountCtrl,
    Food
  },
  methods: {
    getGoodsInfo () {
      axios.get('/api/goods.json').then(this.showGoodsInfo)
    },
    showGoodsInfo (res) {
      res = res.data
      if (res.ret === ERR_OK) {
        this.goods = res.goods
        this.$nextTick(() => {
          this.goodsHeight()
        })
      }
      console.log(res)
    },
    _init_ () {
      this.foodScroll = new BScroll(this.$refs.foodScroll, {click: true, probeType: 3})
      this.asideScroll = new BScroll(this.$refs.asideScroll, {click: true})
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y)) // probeType 属性给滚动添加不同更新频度
      })
    },
    goodsHeight () { // 计算每类 食物的高度
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list')
      let height = 0
      this.listHeight.push(0)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    goFoods (index, e) {
      if (!e._constructed) {
        return 0
      }
      let foodList = this.$refs.foodScroll.getElementsByClassName('food-list')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300) // 将可滚动区域滚动到指定元素位置 传入DOM对象，动画时间[可选]
    },
    selectSingleFood (food) {
      this.singleFood = food
      this.$refs.food.show()
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let subHeight = this.listHeight[i]
        let supHeight = this.listHeight[i + 1]
        if (!supHeight || (this.scrollY >= subHeight && this.scrollY < supHeight)) {
          return i
        }
      }
      return 0
    },
    selectFoods: {
      get () {
        let foods = []
        for (let good of this.goods) {
          for (let food of good.foods) {
            if (food.count) {
              // foods.push({count: food.count, price: food.price, name: food.name}) 这样写严重错误啊 这样传给子组件就不是同一个引用 数据不会实时更新的
              foods.push(food)
            }
          }
        }
        return foods
      }
    }
  },
  mounted () {
    this.getGoodsInfo()
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this._init_()
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .goods
    position absolute
    width 100%
    top 3.5rem
    bottom .96rem
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 1.6rem
      width 1.6rem
      background-color #f3f5f7
      .current
        position relative
        z-index 10
        margin-top -1z-index
        background-color #fff
        font-weight 700
      .menu-item
        display table
        height 1.08rem
        width 1.12rem
        padding 0 .24rem
        line-height .28rem
        border-1px(rgba(7,17,27,.1))
        .text
          display table-cell
          width 1.12rem
          vertical-align middle
          font-size .24rem
          text-align center
          color rgb(7,17,17)
          .icon
            display inline-block
            width .24rem
            height .24rem
            vertical-align top
            margin-right .04rem
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
    .foods-wrapper
      flex 1
      .food-list
        .title
          line-height .52rem
          font-size .24rem
          color rgb(147,153,159)
          padding-left .28rem
          background-color #f3f5f7
          display block
          border-left 1px solid#d9dde1
        ul>li
          display flex
          padding .36rem
          border-1px(rgba(7,17,27,.1))
          -webkit-overflow-scrolling touch;
          .icon
            width 1.15rem
            margin-right .2rem
            img
              width 100%
          .content
            flex 1
            .name
              font-size .28rem
              color rgb(7,17,27)
              line-height .28rem
              padding-top .04rem
              text-overflow ellipsis
            .desc,.extra
              font-size .2rem
              color rgb(147,153,159)
              line-height .28rem
              padding .16rem 0
              font-weight 300
            .extra>span
              margin-right .24rem
            .price
              font-size .2rem/.8rem
              line-height .48rem
              font-weight 700
              span:first-child
                color rgb(255,51,53)
                margin-right .16rem
              .oldPrice
                font-size .2rem
                text-decoration line-through
                color rgb(147,153,159)
            .btn-wrapper
              position absolute
              right .36rem
              bottom .36rem
</style>
