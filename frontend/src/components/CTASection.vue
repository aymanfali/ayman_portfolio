<template>
  <section
    id="cta"
    data-section="cta"
    class="min-h-[50vh] flex flex-col justify-center items-center text-center px-8 relative z-10 bg-gradient-to-r from-cyan-900/20 via-blue-900/20 to-cyan-900/20"
  >
    <!-- Motion Header -->
    <Motion
      :initial="{ opacity: 0, y: 40 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.8 }"
      class="mb-6"
    >
      <h2 class="text-4xl md:text-5xl font-bold text-cyan-300 mb-2 tracking-tight">
        Ready to Build Something Amazing?
      </h2>
      <p class="text-blue-200 text-lg md:text-xl">
        Let’s work together to create modern web applications and innovative solutions.
      </p>
    </Motion>

    <!-- Call to Action Buttons -->
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ delay: 0.2, duration: 0.8 }"
      class="flex flex-col sm:flex-row gap-6 mt-6"
    >
      <button
        @click="scrollTo('contact')"
        class="px-8 py-4 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full hover:bg-cyan-500/40 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
      >
        Contact Me
      </button>
      <button
       @click="scrollTo('projects')"
        class="px-8 py-4 bg-blue-400/20 text-blue-200 border border-blue-300/40 rounded-full hover:bg-blue-400/40 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
      >
        View Projects
      </button>
    </Motion>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'

function scrollTo(id) {
  const el = document.querySelector(`[data-section='${id}']`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Optional subtle background animation */
#cta {
  background-size: 200% 200%;
  animation: gradientShift 12s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
