<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty, QuestionType } from '~/types';


interface Props {
  categoryId: CategoryId;
  difficulty: Difficulty;
  page: number;
  question: QuestionType;
}

const {
  question,
  page,
  categoryId,
  difficulty,
} = defineProps<Props>();
const { setSelectedValue } = useQuestionsStore({ categoryId, difficulty });
const nextLink = computed(() =>
  page >= AMOUNT ? undefined : `/questions/${difficulty}/${categoryId}?page=${page + 1}#question-title`,
);
const prevLink = computed(() =>
  page <= 1 ? undefined : `/questions/${difficulty}/${categoryId}?page=${page - 1}#question-title`,
);

function listener(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    if (nextLink.value == null) navigateTo(`/questions/${difficulty}/${categoryId}/results`);
    else navigateTo(nextLink.value);
  }

  if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    if (nextLink.value == null) navigateTo('/');
    else navigateTo(prevLink.value);
  }

  question.answers.forEach((answer, index) => {
    if (e.key === String(index + 1)) setSelectedValue(question, answer);
  });
}

onMounted(() => window.addEventListener('keydown', listener));
onUnmounted(() => window.removeEventListener('keydown', listener));
</script>


<template>
  <section class="space-y-28 my-4 md:my-8">
    <h2 id="question-title" class="text-2xl font-bold text-center">
      {{ question.category }}
    </h2>
    <div>
      <p class="text-lg text-center">
        {{ question.question }}
      </p>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      <button
        v-for="answer, index in question.answers" :key="answer"
        :class="{ '!bg-red-100': question.selectedAnswer === answer }" class="select w-full"
        @click="setSelectedValue(question, answer)"
      >
        ({{ index + 1 }}) {{ answer }}
      </button>
    </div>

    <AnswersCount :category-id="categoryId" :difficulty="difficulty" />

    <div class="flex justify-between gap-2">
      <NuxtLink
        :tabindex="page <= 1 ? -1 : 0"
        :class="{ 'opacity-50 pointer-events-none': page <= 1 }"
        class="btn uppercase"
        :to="prevLink"
      >
        Previous
      </NuxtLink>
      <NuxtLink
        :tabindex="page >= AMOUNT ? -1 : 0"
        :class="{ 'opacity-50 pointer-events-none': page >= AMOUNT }"
        class="btn uppercase"
        :to="nextLink"
      >
        Next
      </NuxtLink>
    </div>
  </section>
</template>
