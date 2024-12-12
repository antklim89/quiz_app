<script setup lang="ts">
import { CATEGORIES, DIFFICULTIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


definePageMeta({
  validate: ({ params }) => !Number.isNaN(Number(params.page || '1'))
    && Number(params.page || '1') > 0
    && Number(params.page || '1') <= 10
    && typeof params.categoryId === 'string'
    && typeof params.difficulty === 'string'
    && Object.keys(CATEGORIES).includes(params.categoryId)
    && DIFFICULTIES.includes(params.difficulty as Difficulty),
});

const { params } = useRoute();
const categoryId = params.categoryId as CategoryId;
const difficulty = params.difficulty as Difficulty;
</script>

<template>
  <Results :category-id="categoryId" :difficulty="difficulty" />
</template>
