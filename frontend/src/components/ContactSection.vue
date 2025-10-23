<template>
  <section
    id="contact"
    data-section="contact"
    class="min-h-screen flex flex-col justify-center items-center px-8 relative z-10"
  >
    <!-- Section Header -->
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.8 }"
      class="mb-12 text-center"
    >
      <h2 class="text-4xl md:text-5xl font-bold mb-3 text-cyan-300 tracking-tight">Contact Me</h2>
      <p class="text-blue-200 text-lg md:text-xl">
        Feel free to reach out for collaborations or just a friendly chat!
      </p>
    </Motion>

    <!-- Contact Form -->
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ delay: 0.2, duration: 0.8 }"
      class="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
    >
      <form @submit.prevent="submitForm" class="flex flex-col gap-6">
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Your Name"
            class="flex-1 p-4 rounded-xl border border-white/20 bg-white/5 text-blue-100 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Your Email"
            class="flex-1 p-4 rounded-xl border border-white/20 bg-white/5 text-blue-100 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />
        </div>
        <textarea
          v-model="form.message"
          placeholder="Your Message"
          rows="6"
          class="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-blue-100 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          required
        ></textarea>
        <button
          type="submit"
          class="px-6 py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full hover:bg-cyan-500/40 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.5)] self-center"
        >
          Send Message
        </button>
      </form>

      <!-- Success / Error Message -->
      <p v-if="statusMessage" class="mt-4 text-center text-blue-100">{{ statusMessage }}</p>
    </Motion>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Motion } from 'motion-v'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const statusMessage = ref('')

function submitForm() {
  // Replace this with your backend API call (e.g., via Axios)
  statusMessage.value = 'Thank you! Your message has been sent.'
  form.value = { name: '', email: '', message: '' }
}
</script>

