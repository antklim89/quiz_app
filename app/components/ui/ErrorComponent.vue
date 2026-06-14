
<script setup lang="ts">
import type { NuxtError } from '#app';


const props = defineProps<{
  error: Error & { status?: undefined } | NuxtError;
  clearError?: () => void;
}>();

const handleError = props.clearError || (() => clearError({ redirect: '/' }));
</script>

<template>
  <div class="flex flex-col gap-12 justify-center items-center w-full my-12 px-6 py-24">
    <h3 class="text-5xl font-bold">
      ERROR | {{ props.error.status || 500 }}
    </h3>
    <p class="text-center text-xl">
      {{ props.error.message }}
    </p>

    <button class="btn" type="button" @click="handleError">
      Reload
    </button>
  </div>
</template>
