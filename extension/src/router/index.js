import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import Home from '@/pages/Home/index.vue'
import login from './login'
import apps from './apps'
import user from './user'
import sys from './sys' //错误页面等
import {
  Message
} from 'element-ui';

Vue.use(VueRouter)

let routes = [{
  path: '/',
  name: 'home',
  component: Home,
  children: []
}, {
  path: '/admin',
  name: 'admin',
  redirect: '/admin/apps',
  component: Layout,
  children: [...apps, ...sys]
}, ...user, ...login]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach(async (to, from, next) => {
  next();
})

router.afterEach((to, from) => {})

router.onError(() => {
  Message.error('网络异常，请刷新页面重试')
});
export default router