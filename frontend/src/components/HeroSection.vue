<template>
  <section
    data-section="hero"
    class="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
  >
        <CircuitBackground />

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center gap-6">
      <!-- Hexagon Logo -->
      <Motion
        :initial="{ scale: 0, rotate: -45 }"
        :animate="{ scale: 1, rotate: 0 }"
        :transition="{ type: 'spring', stiffness: 120, damping: 15 }"
        class="relative w-72 h-72 backdrop-blur-lg bg-cyan-400/10 clip-hex shadow-[0_0_30px_#22d3ee] flex items-center justify-center"
      >
        <!-- Subtle Shine Overlay -->
        <div
          class="absolute inset-0 from-white/10 via-transparent to-transparent opacity-40 clip-hex pointer-events-none"
        ></div>
        <img src="/logo.jpg" alt="Logo" class="w-full h-full object-contain -rotate-90" />
      </Motion>

      <!-- Name and Title -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.6 }"
      >
        <h1 class="text-5xl md:text-6xl font-bold text-cyan-300 tracking-tight">Engineer Ayman</h1>
        <p class="mt-2 text-blue-200 text-lg md:text-xl">
          Software Engineer · Web Application Developer
        </p>
      </Motion>

      <!-- Call to Action -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.6, duration: 0.6 }"
      >
        <button
          class="mt-6 px-6 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full hover:bg-cyan-500/40 hover:text-white transition-all duration-300 shadow-[0_0_15px_#22d3ee]"
          @click="scrollTo('projects')"
        >
          View My Projects
        </button>
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'
import CircuitBackground from './CircuitBackground.vue';

function scrollTo(id) {
  const el = document.querySelector(`[data-section='${id}']`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Hexagon Shape */
.clip-hex {
  clip-path: polygon(27% 10%, 73% 10%, 96% 50%, 73% 90%, 27% 90%, 4% 50%);
  rotate: 90deg;
}

/* Floating particle animation */
@keyframes float {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-30px) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.5;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
