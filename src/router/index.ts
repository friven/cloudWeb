import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  { //  解决动态路由加载前未找到路由浏览器警告
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404Page.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
