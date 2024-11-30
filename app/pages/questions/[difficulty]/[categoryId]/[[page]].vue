<script setup lang="ts">
import { CATEGORIES, DIFFICULTIES } from '~/lib/constants';
import { useFetchQuestions } from '~/lib/queries';
import type { CategoryId, Difficulty } from '~/lib/types';


definePageMeta({
  validate: ({ params }) => !Number.isNaN(Number(params.page || '1'))
    && Number(params.page || '1') > 0
    && Number(params.page || '1') <= 10
    && typeof params.categoryId === 'string'
    && typeof params.difficulty === 'string'
    && Object.values(CATEGORIES).includes(params.categoryId as CategoryId)
    && Object.values(DIFFICULTIES).includes(params.difficulty as Difficulty),
});

const { params } = useRoute();
const categoryId = params.categoryId as CategoryId;
const difficulty = params.difficulty as Difficulty;

const { data } = await useFetchQuestions({ categoryId, difficulty });

const page = (typeof params.page === 'string' && params.page.length > 0) ? params.page : '1';
const question = computed(() => data.value?.results[Number(page) - 1]);
</script>

<template>
  <Questions
    v-if="question != null"
    :page="page"
    :question="question"
    :category-id="categoryId"
    :difficulty="difficulty"
  />
</template>
