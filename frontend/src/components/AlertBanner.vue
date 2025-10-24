<template>
  <div
    class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-cyan-500/10 border-b border-cyan-400/30 text-cyan-200 flex items-center justify-center py-3 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
  >
    <Motion
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
      class="flex items-center gap-3"
    >
      <span
        class="px-3 py-1 text-xs uppercase font-semibold tracking-wide bg-cyan-400/20 rounded-full border border-cyan-300/30"
      >
        Coming Soon
      </span>
      <p class="text-sm md:text-base">
        🚀 My new portfolio experience is <span class="text-cyan-300 font-medium">launching soon</span> — stay tuned!
      </p>
    </Motion>
  </div>
</template>

<script setup>
import { Motion } from "motion-v";
</script>
