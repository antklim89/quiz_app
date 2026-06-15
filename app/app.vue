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
