<template>
  <div class="star" :class="starType">
     <span v-for="(staritem, index) of starClass" :class="staritem" :key="index" class="item"></span>
  </div>
</template>

<script>
const LENGHT = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'Start',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    starClass () {
      let rerult = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        rerult.push(CLS_ON)
      }
      if (hasDecimal) {
        rerult.push(CLS_HALF)
      }
      while (rerult.length < LENGHT) {
        rerult.push(CLS_OFF)
      }
      return rerult
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style/mixin.styl"
  .star
    font-size 0
    .item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .item
        width .4rem
        height .4rem
        margin-right .24rem
        background-size cover
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star48_on')
        &.half
          bg-image('./img/star48_half')
        &.off
          bg-image('./img/star48_off')
    &.star-36
      .item
        width .3rem
        height .3rem
        margin-right .12rem
        background-size cover
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star36_on')
        &.half
          bg-image('./img/star36_half')
        &.off
          bg-image('./img/star36_off')
    &.star-24
      .item
        width .2rem
        height .2rem
        margin-right .06rem
        background-size cover
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star24_on')
        &.half
          bg-image('./img/star24_half')
        &.off
          bg-image('./img/star24_off')
</style>
