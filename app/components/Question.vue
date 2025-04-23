<script setup lang="ts">
import { useTemplateRef } from 'vue';
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

const nextLink = computed(() => page.value >= AMOUNT ? undefined : `/questions/${difficulty}/${categoryId}?page=${page.value + 1}#question-title`);
const prevLink = computed(() => page.value <= 1 ? undefined : `/questions/${difficulty}/${categoryId}?page=${page.value - 1}#question-title`);

const answers = useTemplateRef(`answers`);

function listener(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    if (nextLink.value == null) navigateTo(`/questions/${difficulty}/${categoryId}/results`);
    else navigateTo(nextLink.value);
  }
  if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    if (nextLink.value == null) navigateTo('/');
    else navigateTo(prevLink.value);
  }

  question.value?.answers.forEach((answer, index) => {
    if (e.key === String(index + 1)) {
      const button = answers.value?.querySelector(`[data-answer-number="${index + 1}"]`);
      if (button instanceof HTMLButtonElement) button.click();
    }
  });
}

onMounted(() => window.addEventListener('keydown', listener));
onUnmounted(() => window.removeEventListener('keydown', listener));
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
    <div ref="answers" class="columns-1 md:columns-2 space-x-4 space-y-4">
      <button
        v-for="answer, index in question.answers" :key="answer" :data-answer-number="index + 1"
        :class="{ '!bg-red-100': question.selectedAnswer === answer }" class="select w-full"
        @click="question.selectedAnswer = answer"
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
  <section v-else>
    <h1 class="text-2xl font-bold text-center my-24">
      No questions
    </h1>
  </section>
</template>
