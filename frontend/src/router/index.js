import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import UsersIndexView from '@/views/dashboard/users/IndexView.vue'
import SettingsIndexView from '@/views/dashboard/settings/IndexView.vue'
import ProfileIndexView from '@/views/profile/IndexView.vue'

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/login',
    component: LoginView,
    meta: { guest: true }, // only for non-authenticated users
  },
  {
    path: '/register',
    component: RegisterView,
    meta: { guest: true },
  },
  {
    path: '/dashboard',
    meta: { requiresAuth: true }, // protected route
    children: [
      { path: '', component: DashboardView },
      { path: 'users', component: UsersIndexView },
      { path: 'settings', component: SettingsIndexView },

      { path: 'profile', component: ProfileIndexView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    // Redirect unauthenticated users to login
    return next('/login')
  }

  if (to.meta.guest && token) {
    // Redirect authenticated users away from login/register
    return next('/dashboard')
  }

  next()
})

export default router
