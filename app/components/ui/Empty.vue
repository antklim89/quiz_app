
<script setup lang="ts">
const props = defineProps<{ message: string; title: string }>();
</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center w-full my-12 p-6 border rounded">
    <h3 class="text-2xl font-bold">
      {{ props.title }}
    </h3>
    <p class="text-center">
      {{ props.message }}
    </p>

    <NuxtLink to="/" class="btn">
      Go back
    </NuxtLink>
  </div>
</template>
