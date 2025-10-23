<script setup lang="ts">
import { Github, Linkedin, MailIcon, PhoneIcon } from 'lucide-vue-next'
</script>

<template>
  <footer class="relative z-10 bg-white/5 backdrop-blur-xl border-t border-cyan-400/20 px-8 py-12">
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.8 }"
      class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <!-- Brand / About -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <h3 class="text-2xl font-bold text-cyan-300 mb-2">Engineer Ayman</h3>
        <p class="text-blue-200 text-sm md:text-base">
          Software Engineer · Web Application Developer
        </p>
      </div>

      <!-- Navigation Links -->
      <div>
        <h4 class="text-cyan-300 font-semibold mb-3">Navigation</h4>
        <ul class="flex flex-col gap-2 text-blue-200">
          <li><a href="#hero" class="hover:text-cyan-300 transition-colors">Home</a></li>
          <li><a href="#projects" class="hover:text-cyan-300 transition-colors">Projects</a></li>
          <li><a href="#services" class="hover:text-cyan-300 transition-colors">Services</a></li>
          <li><a href="#contact" class="hover:text-cyan-300 transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Social Links -->
      <div>
        <h4 class="text-cyan-300 font-semibold mb-3">Social</h4>
        <ul class="flex gap-4">
          <li>
            <a
              href="https://github.com/aymanfali"
              target="_blank"
              class="text-blue-200 hover:text-cyan-300 transition-colors"
            >
              <Github />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ayman-f-ali/"
              target="_blank"
              class="text-blue-200 hover:text-cyan-300 transition-colors"
            >
              <Linkedin />
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact / Call-to-action -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 class="text-cyan-300 font-semibold mb-3">Get in Touch</h4>
        <p class="text-blue-200 text-sm md:text-base mb-2 flex gap-3">
          <MailIcon />
          <a href="mailto:ayman4swd@gmail.com" class="hover:text-cyan-300 transition-colors"
            >ayman4swd@gmail.com</a
          >
        </p>
        <p class="text-blue-200 text-sm md:text-base flex gap-3">
          <PhoneIcon />
          <a href="tel:+967738718923" class="hover:text-cyan-300 transition-colors"
            >+967 738 718 923</a
          >
        </p>
      </div>
    </Motion>

    <!-- Bottom copyright -->
    <div class="text-center mt-10 text-blue-200">© 2025 Engineer Ayman. All rights reserved.</div>
  </footer>
</template>
