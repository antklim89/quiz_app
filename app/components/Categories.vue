<script lang="ts" setup>
import { CATEGORIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const state = useState<{
  selectedDifficulty: Difficulty | null;
  selectedCategory: CategoryId | null;
}>(`categories`, () => ({
  selectedDifficulty: null,
  selectedCategory: null,
}));
</script>

<template>
  <section class="relative mb-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 md:my-12">
      <CategorySelect
        v-for="categoryName, categoryId in CATEGORIES"
        :key="categoryName"
        :category-name="categoryName"
        :category-id="categoryId"
        :is-selected="state.selectedCategory === categoryId"
        @click="state.selectedCategory = categoryId"
      />
    </div>
  </section>
</template>
