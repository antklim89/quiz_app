<script setup lang="ts">
import type { NuxtError } from '#app';


const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <UiErrorComponent :error="props.error" />
</template>
