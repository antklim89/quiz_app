<script setup lang="ts">
const title = 'Quiz App';
const description = 'A simple quiz app';

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon.svg',
    },
  ],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/logo.png',
  twitterCard: 'app',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: '/logo.png',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.link {
  @apply text-primary-800 hover:underline hover:text-primary-900 transition-colors;
}
.btn {
  @apply bg-primary-600 text-white rounded-md px-8 py-4;
}
</style>
