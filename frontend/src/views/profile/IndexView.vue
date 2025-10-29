<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4 md:p-8">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Profile Header -->
      <div
        class="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8"
      >
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <!-- Profile Image -->
          <div class="relative">
            <img
              :src="profile.avatar || '/default-avatar.png'"
              alt="Profile picture"
              class="w-24 h-24 rounded-full object-cover ring-4 ring-neutral-100 dark:ring-neutral-700"
            />
            <button
              @click="toggleEditing('header')"
              class="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
            >
              <Edit2 v-if="!isEditing.header" :size="16" />
              <X v-else :size="16" />
            </button>
          </div>

          <!-- Profile Info -->
          <div class="flex-1">
            <div v-if="!isEditing.header">
              <h1 class="text-3xl font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                {{ profile.name }}
              </h1>
              <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-1">{{ profile.email }}</p>
              <p class="text-neutral-700 dark:text-neutral-200 leading-relaxed">
                {{ profile.bio || 'No bio available.' }}
              </p>
            </div>

            <!-- Edit Mode -->
            <div v-else class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1"
                >
                  Name
                </label>
                <input
                  v-model="editable.header.name"
                  type="text"
                  class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-neutral-700 dark:text-neutral-50"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1"
                >
                  Email
                </label>
                <input
                  v-model="editable.header.email"
                  type="email"
                  class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-neutral-700 dark:text-neutral-50"
                  disabled
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1"
                >
                  Bio
                </label>
                <textarea
                  v-model="editable.header.bio"
                  rows="3"
                  placeholder="Write something about yourself..."
                  class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none dark:bg-neutral-700 dark:text-neutral-50"
                ></textarea>
              </div>

              <!-- Save / Cancel Buttons -->
              <div class="flex justify-end gap-2 pt-2">
                <button
                  @click="cancelEdit('header')"
                  class="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
                >
                  Cancel
                </button>
                <button
                  @click="saveEdit('header')"
                  :disabled="isSaving"
                  class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {{ isSaving ? 'Saving...' : 'Save' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div
        class="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-50">Details</h2>
          <button
            v-if="!isEditing.details"
            @click="toggleEditing('details')"
            class="text-primary dark:text-primary hover:underline"
          >
            Edit
          </button>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <Mail class="text-neutral-500 dark:text-neutral-400" />
            <div>{{ profile.email }}</div>
          </div>
          <div class="flex items-center gap-3">
            <Calendar class="text-neutral-500 dark:text-neutral-400" />
            <div>Joined: {{ formatDate(profile.created_at) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Edit2, X, Mail, Calendar } from 'lucide-vue-next'
import api from '@/api/api'

const isEditing = reactive({
  header: false,
  details: false,
})

const isSaving = ref(false)

const profile = ref({
  id: null,
  name: '',
  email: '',
  bio: '',
  avatar: '',
  created_at: '',
})

const editable = reactive({
  header: {},
  details: {},
})

// Fetch user profile from Laravel API
async function fetchProfile() {
  try {
    const token = localStorage.getItem('token')

    if (!token) throw new Error('No token found')

    const { data } = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    profile.value = data
    editable.header = { ...data }
    editable.details = { ...data }
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
}

// Edit logic
function toggleEditing(section) {
  editable[section] = { ...profile.value }
  isEditing[section] = !isEditing[section]
}

function cancelEdit(section) {
  editable[section] = { ...profile.value }
  isEditing[section] = false
}

async function saveEdit(section) {
  isSaving.value = true
  try {
    const token = localStorage.getItem('token')
    const { data } = await api.put('/profile', editable[section], {
      headers: { Authorization: `Bearer ${token}` },
    })
    profile.value = data
    isEditing[section] = false
  } catch (error) {
    console.error('Failed to save changes:', error)
  } finally {
    isSaving.value = false
  }
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(fetchProfile)
</script>

<style scoped>
.bg-primary {
  background-color: #2563eb;
}
.bg-primary-dark {
  background-color: #1d4ed8;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #2563eb;
}
</style>
