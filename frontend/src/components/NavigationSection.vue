<template>
  <nav
    class="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-full flex gap-6 backdrop-blur-lg bg-white/10 shadow-lg"
  >
    <button
      v-for="(item, index) in navItems"
      :key="index"
      @click="scrollTo(item.id)"
      class="relative px-4 py-2 font-medium rounded-full transition-all duration-300"
      :class="
        activeNav === item.id
          ? 'bg-cyan-400/20 text-cyan-400 shadow-[0_0_10px_#22d3ee]'
          : 'text-blue-100 hover:text-cyan-300 hover:bg-blue-700/30'
      "
    >
      {{ item.label }}
      
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
]

const activeNav = ref('hero')

function scrollTo(id) {
  const el = document.querySelector(`[data-section='${id}']`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const sections = navItems.map((item) => document.querySelector(`[data-section='${item.id}']`))
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeNav.value = entry.target.dataset.section
        }
      })
    },
    { threshold: 0.6 }
  )
  sections.forEach((section) => observer.observe(section))
})

</script>
