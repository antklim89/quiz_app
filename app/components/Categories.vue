<script lang="ts" setup>
import { CATEGORIES, DIFFICULTIES } from '@/lib/constants';
import type { CategoryId, Difficulty } from '~/lib/types';


const selectedDifficulty = ref<Difficulty | null>(null);
const selectedCategory = ref<CategoryId | null>(null);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
    <button
      v-for="difficulty in DIFFICULTIES"
      :key="difficulty"
      class="text-primary-900 bg-primary-50 p-4 rounded-md hover:bg-primary-100 transition-colors hover:no-underline uppercase"
      :class="{ 'bg-red-100': selectedDifficulty === difficulty }"
      @click="selectedDifficulty = difficulty"
    >
      {{ difficulty }}
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
    <button
      v-for="categoryId, category in CATEGORIES"
      :key="category"
      class="text-primary-900 bg-primary-50 p-4 rounded-md hover:bg-primary-100 transition-colors hover:no-underline"
      :class="{ 'bg-red-100': selectedCategory === categoryId }"
      @click="selectedCategory = categoryId"
    >
      {{ category }}
    </button>
  </div>

  <div
    v-show="selectedDifficulty != null && selectedCategory != null"
    class="flex justify-center items-center"
  >
    <NuxtLink class="btn" :to="`/questions/${selectedDifficulty}/${selectedCategory}`">
      Start
    </NuxtLink>
  </div>
</template>
