<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="foodScroll">
        <div class="food-content" >
          <div class="img-head">
            <img :src="food.image" alt="">
            <i class="icon-arrow_lift" @click="close"></i>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <p><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
            <div class="sell">
              <span>￥{{food.price}}</span>
              <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
              <button class="intoCar" v-if="!food.count">加入购物车</button>
              <cart-count-ctrl :food="food" class="ctrlBtn" v-else></cart-count-ctrl>
            </div>
          </div>
          <div class="geLan"></div>
          <div class="intro" v-if="food.info">
            <h1>商品介绍</h1>
            <p>{{food.info}}</p>
          </div>
          <div class="geLan"></div>
          <div class="comment border-1px" v-if="commentDifferLen(-1)">
            <h1>商品评价</h1>
            <div class="classify">
              <button class="all" :class="{'active' : selectClassify === -1}" @click.prevent="changeCalssify(-1)">全部 <span>{{commentDifferLen(-1)}}</span></button>
              <button class="recommend" :class="{'active' : selectClassify === 1}" @click.prevent="changeCalssify(1)">推荐 <span>{{commentDifferLen(1)}}</span></button>
              <button class="negative" :class="{'active' : selectClassify === 0}" @click.prevent="changeCalssify(0)">吐槽 <span>{{commentDifferLen(0)}}</span></button>
            </div>
          </div>
          <div class="filter-comment border-1px" @click.prevent="filterContent" v-if="commentDifferLen(-1)">
            <i class="icon-check_circle" :class="{'on':this.filerComment}"></i>
            <span>只看有内容的评价</span>
          </div>
          <ul>
            <li v-for="(coment, index) of afterFilterCommeent" :key="index" class="comment-list border-1px">
              <div class="comment-list-head">
                <span class="rateTime">{{coment.rateTime | timeFilter}}</span>
                <img :src="coment.avatar" alt="" class="avatar">
                <span class="username">{{coment.username}}</span>
              </div>
              <p><i :class="classMap[coment.rateType]"></i>{{coment.text | textTips}}</p>
            </li>
          </ul>
          <div class="no-comment" v-if="!commentDifferLen(-1)">暂无评论</div>
        </div>
    </div>
  </transition>
</template>

<script>
import CartCountCtrl from '@/components/cartCountCtrl/cartCountCtrl'
import {getTime} from '@/assets/js/formatTime'
import BScroll from 'better-scroll'
export default {
  name: 'Food',
  components: {CartCountCtrl},
  props: {
    food: {
      type: Object
    }
  },
  template: {
    CartCountCtrl
  },
  data () {
    return {
      showFlag: false,
      selectClassify: -1,
      classMap: ['icon-thumb_down', 'icon-thumb_up'],
      filerComment: false,
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {click: true})
        } else {
          this.scroll.refresh()
        }
      })
    },
    close () {
      this.showFlag = false
    },
    changeCalssify (num) {
      this.selectClassify = num
    },
    filterContent () {
      this.filerComment = !this.filerComment
    },
    commentDifferLen (i) {
      if (this.food.ratings) {
        let count = 0
        if (i === -1) {
          return this.food.ratings.length
        }
        this.food.ratings.forEach((item) => {
          if (item.rateType === i) {
            count++
          }
        })
        return count
      }
    }
  },
  computed: {
    currentClassifyArray () {
      if (this.selectClassify === -1) {
        return this.food.ratings
      }
      if (this.selectClassify === 0) {
        return this.food.ratings.filter((item, index) => {
          if (item.rateType === 0) {
            return item
          }
        })
      }
      if (this.selectClassify === 1) {
        return this.food.ratings.filter((item, index) => {
          if (item.rateType === 1) {
            return item
          }
        })
      }
    },
    afterFilterCommeent () {
      if (this.filerComment) {
        return this.currentClassifyArray.filter((item, index) => {
          if (item.text !== '') {
            return item
          }
        })
      } else {
        return this.currentClassifyArray
      }
    }
  },
  filters: {
    timeFilter (time) {
      return getTime(new Date(time))
    },
    textTips (val) {
      if (val === '') {
        return '此用户默认评价'
      } else {
        return val
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .move-enter-active, .move-leave-active
    transition: all .5s
  .move-enter, .move-leave-to
    transform translateX(100%)
  .geLan
    height .23rem
    background-color #f3f5f7
  .food
    position fixed
    left 0
    top 0
    bottom .96rem
    z-index 30
    width 100%
    background-color #fff
    overflow hidden
    .img-head
      position relative
      width 100%
      height 0
      padding-bottom 80%
      overflow hidden
      img
        width 100%
      .icon-arrow_lift
        position absolute
        display block
        top .2rem
        left  .2rem
        color #ffffff
        background-color rgba(0, 0, 0, 0.3)
        width .7rem
        height .7rem
        line-height .7rem
        text-align center
        border-radius 50%
    .content
      padding .36rem
      h1
        font-size .28rem
        font-weight 700
        color rgb(7,17,27)
        line-height .28rem
        display inline-block
        margin-bottom .16rem
      span
        font-size .2rem
        line-height .2rem
        color rgb(147,153,159)
        margin-right .24rem
        font-weight 400
      .sell
        height .50rem
        position relative
        margin-top .36rem
        span
          font-size .28rem
          font-weight 700
          color rgb(240,20,20)
          line-height .50rem
        .oldPrice
          font-size .2rem
          color rgb(147,153,159)
        .intoCar
          position absolute
          right 0
          top 0
          height .50rem
          font-size .2rem
          color #fff
          line-height .50rem
          padding 0 .24rem
          border-radius .24rem
          background-color rgb(0,160,220)
        .ctrlBtn
          position absolute
          right 0
          top 0
    .intro
      padding .36rem
      h1
        font-size .28rem
        color rgb(7,17,27)
        line-height .28rem
        display inline-block
        margin-bottom .12rem
      p
        font-size .24rem
        line-height .48rem
        color #797e83
        font-weight 400
        padding 0 .16rem
    .comment
      margin 0 .36rem
      padding .18rem 0
      border-1px(rgba(7,17,27,.1))
      h1
        font-size .28rem
        color rgb(7,17,27)
        line-height .28rem
        display inline-block
        margin-bottom .12rem
      .classify
        margin .24rem 0 .36rem
        button
          padding .16rem .24rem
          font-size .24rem/.16rem
          line-height .32rem
          margin-right .16rem
          border-radius .05rem
          span
            font-size .24rem
          &.recommend
            background-color #ccecf8
            color #616a72
            &.active
              background-color #00a0dc
              color #fff
          &.all
            background-color #ccecf8
            color #616a72
            &.active
              background-color #00a0dc
              color #fff
          &.negative
            background-color #e9ebec
            color #616a72
            &.active
              background-color #4E5861
              color #fff
    .filter-comment
      padding .24rem .36rem
      line-height .48rem
      border-1px(rgba(7,17,27,.1))
      i
        font-size .48rem
        margin-right .04rem
        vertical-align middle
        &.on
          color #0c9632
      span
        font-size .24rem
    .comment-list
      margin 0 .36rem
      padding .32rem 0
      border-1px(rgba(7,17,27,.1))
      .comment-list-head
        overflow hidden
        margin-bottom .12rem
        span
          font-size .2rem
          color rgb(147,153,159)
          line-height .24rem
          font-weight 500
        .username
          float right
          margin-right .12rem
        .avatar
          width .24rem
          height .24rem
          border-radius 50%
          float right
      p
        font-size .24rem
        color rgb(7,17,27)
        line-height .32rem
        font-weight 400
        i
          font-size .24rem
          color rgb(147,153,159)
          line-height .40rem
          vertical-align top
          margin-right .08rem
          &.icon-thumb_up
            color rgb(0,160,220)
    .no-comment
      font-weight 200
      color #696969
      text-align center
      line-height .96rem
      font-size .28rem
</style>
