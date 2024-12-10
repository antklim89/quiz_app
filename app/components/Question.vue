<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const {
  page: pageStr,
  categoryId,
  difficulty,
} = defineProps<{
  categoryId: CategoryId;
  difficulty: Difficulty;
  page: string;
}>();
const page = computed(() => Number(pageStr || 1));
const questionsStore = useQuestionsStore({ categoryId, difficulty });
const questions = computed(() => questionsStore.value.questions || []);
const question = computed(() => questions.value[page.value - 1]);

const questionVariants = computed(() => {
  const results = question.value && [question.value.correct_answer, ...question.value.incorrect_answers];
  if (question.value?.type === 'multiple') results?.sort(() => Math.random() - 0.5);
  if (question.value?.type === 'boolean') results?.sort(a => a === 'True' ? -1 : 1);
  return results;
});
</script>


<template>
  <section v-if="question != null && questionVariants != null" class="space-y-28 my-4 md:my-8">
    <h2 class="text-2xl font-bold text-center">
      {{ question.category }}
    </h2>
    <div>
      <p class="text-lg text-center">
        {{ question.question }}
      </p>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="variant in questionVariants"
        :key="variant"
        :class="{ '!bg-red-100': questionsStore.answers[page] === variant }"
        class="select"
        @click="questionsStore.answers[page] = variant"
      >
        {{ variant }}
      </button>
    </div>
    <div class="flex justify-between">
      <NuxtLink
        :class="{ invisible: page <= 1 }"
        class="btn"
        :to="`/questions/${difficulty}/${categoryId}?page=${page - 1}`"
      >
        Previous question
      </NuxtLink>
      <NuxtLink
        :class="{ invisible: page >= AMOUNT }"
        class="btn"
        :to="`/questions/${difficulty}/${categoryId}?page=${page + 1}`"
      >
        Next question
      </NuxtLink>
    </div>
  </section>
  <section v-else>
    <h1 class="text-2xl font-bold text-center my-24">
      No questions
    </h1>
  </section>
</template>
