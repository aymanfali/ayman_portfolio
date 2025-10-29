<template>
  <form @submit.prevent="handleRegister">
    <h1>Register</h1>

    <!-- Name -->
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="form.name" @input="clearError('name')" required />
      <p v-for="error in form.errors.name || []" :key="error" class="text-red-500">
        {{ error }}
      </p>
    </div>

    <!-- Email -->
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" @input="clearError('email')" required />
      <p v-for="error in form.errors.email || []" :key="error" class="text-red-500">
        {{ error }}
      </p>
    </div>

    <!-- Password -->
    <div>
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        @input="clearError('password')"
        required
      />
      <p v-for="error in form.errors.password || []" :key="error" class="text-red-500">
        {{ error }}
      </p>
    </div>

    <!-- Confirm Password -->
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        v-model="form.password_confirmation"
        @input="clearError('password_confirmation')"
        required
      />
      <p v-for="error in form.errors.password_confirmation || []" :key="error" class="text-red-500">
        {{ error }}
      </p>
    </div>

    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/api'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  errors: {}, // field-specific errors
})

// Clear field-specific error when user types
const clearError = (field) => {
  if (form.errors[field]) form.errors[field] = []
}

const handleRegister = async () => {
  try {
    const res = await api.post('/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })

    // Save JWT & user info
    localStorage.setItem('token', res.data.access_token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    // Clear errors
    form.errors = {}

    router.push('/dashboard')
  } catch (err) {
    const data = err.response?.data
    form.errors = {} // reset errors

    if (data?.errors) {
      // Laravel returns errors per field
      form.errors = data.errors
    }
  }
}
</script>
