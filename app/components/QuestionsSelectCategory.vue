<script setup lang="ts">
import type { CategoryName } from '~/types';


const { categoryName } = defineProps<{ categoryName: CategoryName }>();
</script>

<template>
  <div class="flex flex-col space-y-2 border border-primary-600 rounded-md p-4">
    <h4 class="text-2xl text-center">
      {{ categoryName }}
    </h4>
    <slot />
  </div>
</template>
