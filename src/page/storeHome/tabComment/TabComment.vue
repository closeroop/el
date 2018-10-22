<template>
  <div>
    <div class="ratings" ref="commentScroll">
      <div class="ratings-content" >
        <div class="overview">
          <div class="o-left">
            <h1>{{seller.score}}</h1>
            <h3>综合评分</h3>
            <span>高于周边商家{{seller.rankRate}}%</span>
          </div>
          <div class="o-right">
            <ul>
              <li><span>服务态度</span><star :size="36" :score="3.6" class="stars"></star><span class="score">{{seller.score}}</span></li>
              <li><span>食物品质</span><star :size="36" :score="4.0" class="stars"></star><span class="score">{{seller.foodScore}}</span></li>
              <li><span>送达时间</span><span class="get-time">{{seller.deliveryTime}}分钟送达</span></li>
            </ul>
          </div>
        </div>
        <div class="geLan"></div>
        <div class="comment border-1px">
          <div class="classify">
            <button class="all" :class="{'active' : selectClassify === -1}" @click.prevent="changeCalssify(-1)">全部<span>{{seller.ratingCount}}</span></button>
            <button class="recommend" :class="{'active' : selectClassify === 1}" @click.prevent="changeCalssify(1)">推荐 <span>{{commentDifferLen(1)}}</span></button>
            <button class="negative" :class="{'active' : selectClassify === 0}" @click.prevent="changeCalssify(0)">吐槽 <span>{{commentDifferLen(0)}}</span></button>
          </div>
        </div>
        <div class="filter-comment border-1px" @click.prevent="filterContent">
          <i class="icon-check_circle" :class="{'on':this.filerComment}"></i>
          <span>只看有内容的评价</span>
        </div>
        <ul>
          <li v-for="(coment, index) of afterFilterCommeent" :key="index" class="comment-list border-1px">
            <img :src="coment.avatar" alt="" class="avatar">
            <div class="comment-list-right">
              <div class="comment-list-head">
                <span class="rateTime">{{coment.rateTime | timeFilter}}</span>
                <span class="username">{{coment.username}}</span>
              </div>
              <star :size="24" :score="coment.score" class="stars"></star>
              <span class="get-time" v-if="coment.deliveryTime">{{coment.deliveryTime}}分钟送达</span>
              <p>{{coment.text | textTips}}</p>
              <div class="recommend">
                <i :class="classMap[coment.rateType]"></i>
                <mark v-for="(item, index) of coment.recommend" :key="index" class="label">{{item}}</mark>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '@/components/star/Star'
import {getTime} from '@/assets/js/formatTime'
import ShopCart from '@/components/shopCart/ShopCart'
import axios from 'axios'
const ERR_OK = 0
export default {
  name: 'TabComment',
  props: {
    seller: Object
  },
  data () {
    return {
      ratings: [],
      selectClassify: -1,
      filerComment: false,
      classMap: ['icon-thumb_down', 'icon-thumb_up']
    }
  },
  components: {
    Star,
    ShopCart
  },
  methods: {
    getRatingsInfo () {
      axios.get('/api/ratings.json').then(this.showRatingsInfo)
    },
    showRatingsInfo (res) {
      res = res.data
      if (res.ret === ERR_OK) {
        this.ratings = res.ratings
      }
    },
    changeCalssify (num) {
      this.selectClassify = num
    },
    filterContent () {
      this.filerComment = !this.filerComment
    },
    commentDifferLen (i) {
      if (this.ratings) {
        let count = 0
        if (i === -1) {
          return this.ratings.length
        }
        this.ratings.forEach((item) => {
          if (item.rateType === i) {
            count++
          }
        })
        return count
      }
    }
  },
  mounted () {
    this.getRatingsInfo()
    this.scroll = new BScroll(this.$refs.commentScroll, {click: true})
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
  },
  computed: {
    currentClassifyArray () {
      if (this.selectClassify === -1) {
        return this.ratings
      }
      if (this.selectClassify === 0) {
        return this.ratings.filter((item) => {
          if (item.rateType === 0) {
            return item
          }
        })
      }
      if (this.selectClassify === 1) {
        return this.ratings.filter((item) => {
          if (item.rateType === 1) {
            return item
          }
        })
      }
    },
    afterFilterCommeent () {
      if (this.filerComment) {
        return this.currentClassifyArray.filter((item) => {
          if (item.text !== '') {
            return item
          }
        })
      } else {
        return this.currentClassifyArray
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .geLan
    height .24rem
    background-color #f3f5f7
    border-top 1px solid #EEF0F2
    border-bottom 1px solid #EEF0F2
  .ratings
    position absolute
    top 3.5rem
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding .36rem 0
      .o-left
        flex 0 0 2.45rem
        width 2.45rem
        text-align center
        border-right 1px solid #c8cacc
        h1
          font-size .48rem
          color rgb(255,153,0)
          line-height .56rem
        h3
          font-size .24rem
          color rgb(7,17,27)
          line-height .24rem
          display inline-block
          width 100%
          margin .12rem 0 .16rem
        span
          font-size .2rem
          color #929597
          line-height .2rem
          font-weight 400
      .o-right
        flex 1
        padding .12rem .48rem
        color rgb(7,17,27)
        line-height .36rem
        font-size .24rem
        li+li
          margin-top .16rem
        span
          font-weight 400
        .get-time
          color rgb(147,153,159)
          margin-left .2rem
        .score
          color rgb(255,153,0)
        .stars
          display inline-block
          line-height normal
          vertical-align top
          margin 0 .2rem
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
      padding .36rem 0
      border-1px(rgba(7,17,27,.1))
      display flex
      .avatar
        width .56rem
        height .56rem
        border-radius 50%
        flex 0 0 .56rem
        margin-right .24rem
      .comment-list-right
        flex 1
        .comment-list-head
          overflow hidden
          margin-bottom .12rem
          span
            font-size .2rem
            color rgb(147,153,159)
            line-height .24rem
            font-weight 500
          .rateTime
            float right
            margin-right .12rem
        .stars
          display inline-block
        .get-time
          font-size .2rem
          font-weight 400
          color rgb(147,153,159)
          line-height .24rem
        p
          font-size .24rem
          color rgb(7,17,27)
          line-height .32rem
          font-weight 400
          padding-top .12rem
        .recommend
          margin-top .16rem
          i
            font-size .24rem
            color rgb(147,153,159)
            line-height .32rem
            padding-right .12rem
            &.icon-thumb_up
              color rgb(0,160,220)
          .label
            max-width 1.6rem
            border 1px solid rgba(7,17,27,.1)
            background-color #fff
            border-radius .02rem
            display inline-block
            margin-right .12rem
            padding 0 .12rem
            font-size .18rem
            color rgb(147,153,159)
            line-height .32rem
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            vertical-align top
            margin-bottom .05rem
            font-weight 400
</style>
