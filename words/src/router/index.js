import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home/index.vue'
import Cen from '@/pages/Home/cen.vue'
import Note from '@/pages/Note/index.vue'
import Mem from '@/pages/MEM/index.vue'
import Download from '@/pages/Download/index.vue'

Vue.use(VueRouter)

let routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: []
}, {
  path: '/cen',
  name: 'cen',
  component: Cen,
  children: []
}, {
  path: '/note',
  name: 'note',
  component: Note,
  children: []
}, {
  path: '/mem',
  name: 'mem',
  component: Mem,
  children: []
},{
  path: '/download',
  name: 'download',
  component: Download,
  children: []
}]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => { //登录等逻辑，如果是登录状态，不存在路由，则直接跳转主页;存在的路由，则next()
  next();
})

router.afterEach((to, from) => { })

export default router