<script lang="ts" setup>
import { CATEGORIES } from '@/lib/constants';
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
    <NuxtLink
      v-for="categoryId, category in CATEGORIES"
      :key="category"
      class=" text-purple-900 bg-purple-50 p-4 rounded-md hover:bg-purple-100 transition-colors hover:no-underline"
      :to="`/categories/${categoryId}`"
    >
      {{ category }}
    </NuxtLink>
  </div>
</template>
