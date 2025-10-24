<script setup>
import AlertBanner from '@/components/AlertBanner.vue';
import FooterSection from '@/components/FooterSection.vue'
import NavigationSection from '@/components/NavigationSection.vue'
import ProgressSteps from '@/components/ProgressSteps.vue'
</script>

<template>
  <AlertBanner />
  <NavigationSection />
  <ProgressSteps />
  <slot />
  <FooterSection />
</template>
