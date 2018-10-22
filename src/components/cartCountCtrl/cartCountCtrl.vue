<template>
    <div class="cartCountCtrl">
      <transition name="fade1">
        <div class="decrease" @click="removeOne" v-if="food.count>0">
          <span class="icon-remove_circle_outline"></span>
        </div>
      </transition>
      <transition name="num">
        <div class="count" v-if="food.count>0">{{food.count}}</div>
      </transition>
      <div class="increase" @click="addOne">
        <span class="icon-add_circle"></span>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'cartCountCtrl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    removeOne (e) {
      if (!e._constructed) {
        return 0
      }
      this.food.count--
      if (this.food.count < 0) {
        this.food.count = 0
      }
    },
    addOne (e) {
      if (!e._constructed) {
        return 0
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      console.log(233)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade1-enter-active, .fade1-leave-active
    transition: all .5s
  .fade1-enter, .fade1-leave-to
    opacity 0
  .fade1-leave-to
    transform translateX(.4rem)
  .num-enter-active, .num-leave-active
    transition: all .5s;
  .num-enter,.num-leave-to
    opacity: 0
    transform translateY(.24rem)
  .cartCountCtrl
    display flex
    .decrease span,.increase span
      font-size .45rem
      color #00a0dc
    .count
      font-size .24rem
      color rgb(147,153,159)
      line-height .45rem
      padding 0 .05rem
      font-weight 700
      transition all .5s
      min-width .25rem
      text-align center
</style>
