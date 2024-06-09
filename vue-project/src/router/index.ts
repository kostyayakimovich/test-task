import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/Images.vue')
    },
    {
      path: '/mdat',
      name: 'mdat',
      component: () => import('../views/Mdat.vue')
    },
    {
      path: '/other-types',
      name: 'otherTypes',
      component: () => import('../views/OtherTypes.vue')
    }
  ]
})

export default router
