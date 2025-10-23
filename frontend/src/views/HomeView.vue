<script setup>
import HeroSection from '@/components/HeroSection.vue'
import ProjectSection from '@/components/ProjectSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import AppLayout from './layouts/AppLayout.vue'
import ContactSection from '@/components/ContactSection.vue'
import CTASection from '@/components/CTASection.vue'
</script>

<template>
  <AppLayout>
    <HeroSection />
    <ProjectSection />
    <ServicesSection />
    <ContactSection />
    <CTASection />
  </AppLayout>
</template>
