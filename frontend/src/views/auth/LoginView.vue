<template>
  <form @submit.prevent="handleLogin">
    <h1>Login</h1>

    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>

    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="form.password" required />
    </div>

    <p v-if="form.error" class="text-red-500">{{ form.error }}</p>

    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import api from '@/api/api' // your axios instance configured with baseURL
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  error: null,
})

const handleLogin = async () => {
  try {
    const res = await api.post('/login', {
      email: form.email,
      password: form.password,
    })

    // Save JWT token
    localStorage.setItem('token', res.data.access_token)

    // Optionally store user info
    localStorage.setItem('user', JSON.stringify(res.data.user))

    form.error = null
    router.push('/dashboard')
  } catch (err) {
    form.error = err.response?.data?.message || 'Login failed.'    
  }
}
</script>
