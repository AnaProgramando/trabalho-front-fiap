import LoginView from '@/components/Login.vue'
import HomeView from '@/components/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, logout } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
