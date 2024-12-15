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
</script>


<template>
  <section v-if="question != null" class="space-y-28 my-4 md:my-8">
    <h2 id="question-title" class="text-2xl font-bold text-center">
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

    <AnswersCount :category-id="categoryId" :difficulty="difficulty" />

    <div class="flex justify-between gap-2">
      <NuxtLink
        :tabindex="page <= 1 ? -1 : 0"
        :class="{ 'opacity-50 pointer-events-none': page <= 1 }"
        class="btn uppercase"
        :to="page <= 1 ? undefined : `/questions/${difficulty}/${categoryId}?page=${page - 1}#question-title`"
      >
        Previous
      </NuxtLink>
      <NuxtLink
        :tabindex="page >= AMOUNT ? -1 : 0"
        :class="{ 'opacity-50 pointer-events-none': page >= AMOUNT }"
        class="btn uppercase"
        :to="page >= AMOUNT ? undefined : `/questions/${difficulty}/${categoryId}?page=${page + 1}#question-title`"
      >
        Next
      </NuxtLink>
    </div>
  </section>
  <section v-else>
    <h1 class="text-2xl font-bold text-center my-24">
      No questions
    </h1>
  </section>
</template>
