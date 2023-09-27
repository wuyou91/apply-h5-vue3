import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/404.vue')
    },
    // {
    //   path: '/:catchAll(.*)',
    //   redirect: '/404'
    // }
  ]
})

export default router
