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
const question = computed(() => questionsStore.value?.[page.value]);

const answersLength = computed(() => questionsStore.value ? Object.values(questionsStore.value).filter(i => i.selectedAnswer != null).length : 0);
</script>


<template>
  <section v-if="question != null" class="space-y-28 my-4 md:my-8">
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
        v-for="answer in question.answers"
        :key="answer"
        :class="{ '!bg-red-100': question.selectedAnswer === answer }"
        class="select"
        @click="question.selectedAnswer = answer"
      >
        {{ answer }}
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
        :class="{ invisible: answersLength !== AMOUNT }"
        class="btn"
        :to="`/questions/${difficulty}/${categoryId}/results`"
      >
        Show results
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
