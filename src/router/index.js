import Vue from 'vue'
import Router from 'vue-router'
import StoreHome from '@/page/storeHome/StoreHome'
import TabGoods from '@/page/storeHome/tabGoods/TabGoods'
import TabComment from '@/page/storeHome/tabComment/TabComment'
import TabStore from '@/page/storeHome/tabStore/TabStore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/storeHome',
      name: 'StoreHome',
      component: StoreHome,
      redirect: '/storeHome/goods', // 默认去goods页
      children: [
        {
          path: 'goods', // path: '/goods' 会访问根上的路径，别这样写
          name: 'TabGoods',
          component: TabGoods
        },
        {
          path: 'comment',
          name: 'TabComment',
          component: TabComment
        },
        {
          path: 'store',
          name: 'TabStore',
          component: TabStore
        }
      ]
    }
  ],
  linkActiveClass: 'active' // 激活路由class名 配置
})
