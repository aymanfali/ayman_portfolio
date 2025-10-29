<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'
import api from '@/api/api'

const router = useRouter()

const showDropdown = ref(false)
const user = ref({
  name: 'Guest',
  avatar: null,
})

// Toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (!event.target.closest('#user-menu')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)

  // ✅ Load user data from localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser)
      user.value.name = parsed.name || 'User'
      user.value.avatar = parsed.avatar || null
    } catch (error) {
      console.error('Invalid user data in localStorage', error)
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})

// Handle logout
const logout = async () => {
  await api.post('/logout')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <header
    class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
  >
    <!-- Left -->
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
    </div>

    <!-- Right: User Menu -->
    <div class="relative" id="user-menu">
      <button
        @click="toggleDropdown"
        class="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <template v-if="user.avatar">
          <img :src="user.avatar" alt="User avatar" class="w-8 h-8 rounded-full" />
        </template>
        <template v-else>
          <FontAwesomeIcon :icon="faUserCircle" class="text-gray-500 w-8 h-8" />
        </template>

        <span class="text-gray-800 dark:text-gray-100 font-medium">{{ user.name }}</span>
      </button>

      <!-- Dropdown -->
      <div
        v-show="showDropdown"
        class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden z-50"
      >
        <a
          href="/dashboard/profile"
          class="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Profile
        </a>
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
