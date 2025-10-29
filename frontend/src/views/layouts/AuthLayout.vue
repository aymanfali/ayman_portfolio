<script setup lang="ts">
import { ref } from 'vue'
import Footer from '@/components/dashboard/AuthFooter.vue'
import Header from '@/components/dashboard/AuthHeader.vue'
import Sidebar from '@/components/dashboard/AuthSidebar.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBarsStaggered,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

const isCollapsed = ref(false)
const isMobileOpen = ref(false)

const toggleCollapse = () => (isCollapsed.value = !isCollapsed.value)
const toggleMobile = () => (isMobileOpen.value = !isMobileOpen.value)
</script>

<template>
  <Header />

  <main class="flex h-screen relative">
    <!-- Sidebar -->
    <Sidebar
      :is-collapsed="isCollapsed"
      :is-mobile-open="isMobileOpen"
      @toggle-collapse="toggleCollapse"
      @toggle-mobile="toggleMobile"
    />

    <!-- Collapse trigger on sidebar border -->
    <button
      v-if="!isMobileOpen"
      @click="toggleCollapse"
      class="hidden md:flex m-2 transition-all duration-300"
    >
      <div
        class="w-7 h-7 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <FontAwesomeIcon
          :icon="isCollapsed ? faChevronRight : faChevronLeft"
          class="text-gray-600 dark:text-gray-300 transform transition-transform duration-300"
        />
      </div>
    </button>

    <!-- Mobile Toggle Button -->
    <button
      @click="toggleMobile"
      class="md:hidden fixed top-12 left-4 z-50 bg-white  hover:bg-gray-300 border border-gray-300 dark:hover:bg-gray-600 p-1 rounded"
    >
      <span v-if="isMobileOpen"><FontAwesomeIcon :icon="faXmark" /></span>
      <span v-else><FontAwesomeIcon :icon="faBarsStaggered" /></span>
    </button>

    <!-- Main Content -->
    <div class="p-5 transition-all duration-300">
      <slot />
    </div>
  </main>

  <Footer />
</template>
