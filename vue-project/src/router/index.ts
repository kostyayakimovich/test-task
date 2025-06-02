import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/PostPage.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserPage.vue')
    }
  ]
})

export default router
