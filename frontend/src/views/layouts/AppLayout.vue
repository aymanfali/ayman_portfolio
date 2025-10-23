<script setup>
import FooterSection from '@/components/FooterSection.vue'
import NavigationSection from '@/components/NavigationSection.vue'
import ProgressSteps from '@/components/ProgressSteps.vue'
</script>

<template>
  <NavigationSection />
  <ProgressSteps />
  <slot />
  <FooterSection />
</template>
