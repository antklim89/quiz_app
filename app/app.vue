<script setup lang="ts">
import '@fontsource/inter/400.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/400-italic.css';
import '@fontsource/inter/800-italic.css';


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
body {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}
html {
  scroll-behavior: smooth;
}
pre {
  font-family: inherit;
}
.link {
  @apply text-primary-800 hover:underline hover:text-primary-900 transition-colors;
}
.btn {
  @apply bg-primary-600 hover:bg-primary-700 text-white text-center rounded-md px-8 py-4;
}
.select {
  @apply text-primary-900 bg-primary-50 p-4 rounded-md hover:bg-primary-100 transition-colors hover:no-underline uppercase;
}
</style>
