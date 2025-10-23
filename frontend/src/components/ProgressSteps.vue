<template>
  <div
    class="fixed right-8 top-1/4 bottom-1/4 flex flex-col items-center justify-between z-50 backdrop-blur-lg bg-white/10 shadow-lg p-3 rounded-full"
  >
    <!-- Background spine -->
    <div
      class="absolute w-[3px] bg-gradient-to-b from-blue-700/40 to-blue-500/20 top-0 bottom-0 rounded-full blur-sm"
    ></div>

    <!-- Animated fill line -->
    <Motion
      :animate="{ height: fillHeight + '%' }"
      :transition="{ duration: 0, ease: [0.4, 0, 0.2, 1] }"
      class="absolute w-[3px] bg-gradient-to-b from-cyan-400 via-blue-400 to-blue-300 top-0 rounded-full shadow-[0_0_16px_#22d3ee]"
      style="filter: drop-shadow(0 0 8px #22d3ee)"
    ></Motion>

    <!-- Steps -->
    <Motion
      v-for="(step, index) in steps"
      :key="step.id"
      :animate="{
        scale: activeStep === index ? 1.2 : 1,
        opacity: activeStep === index ? 1 : 0.6,
      }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
      class="relative cursor-pointer group"
      @click="scrollTo(step.id)"
    >
      <div
        v-if="activeStep === index"
        class="absolute inset-0 rounded-full blur-md bg-cyan-400/50 animate-pulse"
      ></div>

      <div
        class="w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
        :class="
          activeStep === index
            ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_20px_#22d3ee]'
            : 'border-blue-400 bg-blue-700/40 backdrop-blur-sm'
        "
      >
        <div
          v-if="activeStep === index"
          class="w-2.5 h-2.5 bg-white rounded-full animate-ping"
        ></div>
      </div>

      <div
        class="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1 text-xs bg-blue-900/60 text-cyan-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-md border border-cyan-300/20"
      >
        {{ step.label }}
      </div>
    </Motion>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Motion } from 'motion-v'

const steps = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
  { id: 'cta', label: 'CTA' },
]

const activeStep = ref(0)
const fillHeight = ref(0)

function scrollTo(id) {
  const el = document.querySelector(`[data-section='${id}']`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function calculateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = Math.min((scrollTop / docHeight) * 100, 100)
  fillHeight.value = progress
}

onMounted(() => {
  const sections = steps.map((s) => document.querySelector(`[data-section='${s.id}']`))
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeStep.value = sections.indexOf(entry.target)
        }
      })
    },
    { threshold: 0.6 },
  )
  sections.forEach((section) => observer.observe(section))

  window.addEventListener('scroll', calculateProgress, { passive: true })
  calculateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress)
})
</script>
