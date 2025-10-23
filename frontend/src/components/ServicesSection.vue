<template>
  <section
    data-section="services"
    class="min-h-screen flex flex-col justify-center items-center text-center px-8 relative z-10"
  >
    <!-- Section Header -->
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.8 }"
      class="mb-12"
    >
      <h2 class="text-4xl md:text-5xl font-bold mb-3 text-cyan-300 tracking-tight">Services</h2>
      <p class="text-blue-200 text-lg md:text-xl">What I can offer to help your business grow.</p>
    </Motion>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 max-w-6xl w-full">
      <Motion
        v-for="(service, index) in services"
        :key="index"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ delay: index * 0.2, duration: 0.8 }"
        :viewport="{ once: true }"
        class="relative group bg-white/10 border border-cyan-400/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-transform duration-500 flex flex-col items-center"
      >
        <!-- Icon with Glow -->
        <component
          :is="service.icon"
          class="w-14 h-14 mb-4 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300"
        />
        <h3 class="text-xl font-semibold text-cyan-300 mb-3">{{ service.title }}</h3>
        <p class="text-blue-100 text-sm md:text-base">{{ service.description }}</p>
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'
import { Code, Layout, Cpu } from 'lucide-vue-next'

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Building robust and scalable web apps using modern frameworks like Laravel and Vue.js.',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Designing clean, user-focused interfaces that balance aesthetics with usability.',
  },
  {
    icon: Cpu,
    title: 'System Architecture',
    description: 'Designing software systems following SOLID and clean architecture principles.',
  },
]
</script>

<style scoped>
/* Optional: subtle icon pulse on hover */
.group:hover component {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
