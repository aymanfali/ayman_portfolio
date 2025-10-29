<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faUsers, faGear } from '@fortawesome/free-solid-svg-icons'

// Props (plain JS)
defineProps({
  isCollapsed: Boolean,
  isMobileOpen: Boolean,
})

// Emits
defineEmits(['toggle-collapse', 'toggle-mobile'])

// Navigation links
const navLinks = [
  { name: 'home', label: 'Home', href: '/dashboard', icon: faHouse },
  { name: 'users', label: 'Users', href: '/dashboard/users', icon: faUsers },
  { name: 'settings', label: 'Settings', href: '/dashboard/settings', icon: faGear },
]
</script>

<template>
  <aside
    :class="[
      'h-screen border-r border-gray-300 bg-white dark:bg-gray-900 transition-[width,transform] duration-300 ease-in-out fixed md:static z-40 overflow-hidden flex flex-col',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <div class="flex-1 p-3">
      <h1 v-show="!isCollapsed" class="text-gray-800 dark:text-gray-100 font-semibold mb-4">
        Dashboard
      </h1>

      <nav class="space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          class="group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200"
          :class="{
            'bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white':
              $route.path === link.href,
            'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800':
              $route.path !== link.href,
          }"
        >
          <!-- Icon -->
          <FontAwesomeIcon
            :icon="link.icon"
            class="text-lg w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition"
          />

          <!-- Label (hidden when collapsed) -->
          <span v-show="!isCollapsed" class="truncate">{{ link.label }}</span>

          <!-- Tooltip when collapsed -->
          <transition name="fade">
            <span
              v-if="isCollapsed"
              class="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap transition pointer-events-none"
            >
              {{ link.label }}
            </span>
          </transition>
        </router-link>
      </nav>
    </div>
  </aside>
</template>
