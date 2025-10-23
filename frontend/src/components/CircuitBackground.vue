<template>
  <canvas ref="canvas" class="fixed inset-0 w-full h-full -z-10"></canvas>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx, width, height
let particles = []

const particleCount = 100
const connectionDistance = 140

class Particle {
  constructor() {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.4
    this.vy = (Math.random() - 0.5) * 0.4
    this.radius = Math.random() * 2 + 1
  }
  move() {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'
    ctx.fill()
  }
}

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < connectionDistance) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height)
  particles.forEach((p) => {
    p.move()
    p.draw()
  })
  connect()
  requestAnimationFrame(animate)
}

onMounted(() => {
  const c = canvas.value
  ctx = c.getContext('2d')
  resizeCanvas()
  for (let i = 0; i < particleCount; i++) particles.push(new Particle())
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})

function resizeCanvas() {
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = width
  canvas.value.height = height
}
</script>

<style scoped>
canvas {
  background: radial-gradient(ellipse at top, rgba(5, 20, 50, 0.8), rgba(3, 10, 30, 1));
}
</style>
