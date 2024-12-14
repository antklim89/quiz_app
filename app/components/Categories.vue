<script lang="ts" setup>
import { CATEGORIES, DIFFICULTIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const selectedDifficulty = ref<Difficulty | null>(null);
const selectedCategory = ref<CategoryId | null>(null);
</script>

<template>
  <section class="relative mb-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
      <button
        v-for="difficulty in DIFFICULTIES"
        :key="difficulty"
        class="select uppercase"
        :class="{ '!bg-red-100': selectedDifficulty === difficulty }"
        @click="selectedDifficulty = difficulty"
      >
        {{ difficulty }}
      </button>
    </div>

    <hr class="my-8 border-t-primary-600">

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
      <button
        v-for="category, categoryId in CATEGORIES"
        :key="category"
        class="select"
        :class="{ '!bg-red-100': selectedCategory === categoryId }"
        @click="selectedCategory = categoryId"
      >
        {{ category }}
      </button>
    </div>

    <div
      v-show="selectedDifficulty != null && selectedCategory != null"
      class="flex justify-center items-center"
    >
      <NuxtLink class="btn uppercase fixed bottom-4 shadow-md shadow-black" :to="`/questions/${selectedDifficulty}/${selectedCategory}`">
        Start
      </NuxtLink>
    </div>
  </section>
</template>
