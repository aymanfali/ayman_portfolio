<template>
  <section
    data-section="projects"
    class="min-h-screen flex flex-col justify-center items-center px-8 text-center relative z-10"
  >
    <!-- Section Header -->
    <Motion
      :initial="{ opacity: 0, y: 50 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :viewport="{ once: true }"
      :transition="{ duration: 0.8 }"
      class="mb-12"
    >
      <h2 class="text-4xl md:text-5xl font-bold mb-3 text-cyan-300 tracking-tight">Projects</h2>
      <p class="text-blue-200 text-lg md:text-xl">
        A selection of modern apps I’ve built recently.
      </p>
    </Motion>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      <Motion
        v-for="(project, index) in projects"
        :key="index"
        :initial="{ opacity: 0, y: 80 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ delay: index * 0.2, duration: 0.8 }"
        :viewport="{ once: true }"
        class="relative bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-[0_0_20px_rgba(34,211,238,0.3)] border border-cyan-400/30 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-transform duration-500 flex flex-col justify-between items-center"
      >
        <!-- Project Image -->
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-40 md:h-48 object-cover rounded-2xl mb-4"
        />

        <!-- Title & Description -->
        <h3 class="text-xl font-semibold text-cyan-300 mb-2">{{ project.title }}</h3>
        <p class="text-blue-100 text-sm md:text-base mb-4">{{ project.description }}</p>

        <!-- Links -->
        <div class="flex gap-4">
          <!-- <a
            :href="project.link"
            target="_blank"
            class="px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full hover:bg-cyan-500/40 hover:text-white transition-all duration-300"
          >
            Live Demo
          </a> -->
          <a
            :href="project.github"
            target="_blank"
            class="px-4 py-2 bg-blue-400/20 text-blue-200 border border-blue-300/40 rounded-full hover:bg-blue-400/40 hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.77 8.205 11.363.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.403 11.52 11.52 0 0 1 3 .403c2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.922.43.37.813 1.102.813 2.222 0 1.604-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 22.27 24 17.78 24 12.5 24 5.87 18.627.5 12 .5z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </Motion>
    </div>
  </section>
</template>

<script setup>
import { Motion } from 'motion-v'

const projects = [
  {
    title: 'Conote',
    description:
      'A real-time collaborative note-taking app with live syncing.',
    link: '#',
    github: 'https://github.com/aymanfali/collaborative_node_editor_frontend',
    image: '/images/projects/conote.png',
  },
  {
    title: 'Learn Platform',
    description:
      'An e-learning platform built with Vue.js and Laravel for interactive courses.',
    link: '#',
    github: 'https://github.com/aymanfali/learning_management_system',
    image: '/images/projects/LMS.png',
  },
]
</script>
