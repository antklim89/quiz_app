<script setup lang="ts">
import { CATEGORIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const {
  categoryId,
  difficulty,
} = defineProps<{
  categoryId: CategoryId;
  difficulty: Difficulty;
}>();

const questionsStore = useQuestionsStore({ categoryId, difficulty });
const correctAnswersLength = computed(() => questionsStore.value ? Object.values(questionsStore.value).filter(i => i.selectedAnswer === i.correctAnswer).length : 0);
const wrongAnswersLength = computed(() => questionsStore.value ? Object.values(questionsStore.value).length - correctAnswersLength.value : 0);

function resetQuestions() {
  questionsStore.value = null;
  navigateTo(`/questions/${difficulty}/${categoryId}`);
}
</script>

<template>
  <section class="my-12">
    <header class="space-y-4 my-8">
      <h1 class="text-4xl text-center mb-8">
        Results
      </h1>

      <h2 class="text-2xl text-center">
        {{ CATEGORIES[categoryId] }}
      </h2>

      <h2 class="text-2xl text-center uppercase">
        {{ difficulty }}
      </h2>
    </header>

    <div class="space-y-6">
      <div
        v-for="question in questionsStore"
        :key="question.question"
        class="border space-y-4 border-primary-600 rounded-md p-4"
      >
        <p class="text-lg">
          {{ question.question }}
        </p>
        <p v-if="question.selectedAnswer === question.correctAnswer" class="text-lg">
          <span class="text-green-600">&#10003;</span> Your answer "{{ question.selectedAnswer }}" is right.
        </p>
        <p v-else>
          <span class="text-red-600">&#10007;</span> Your answer "{{ question.selectedAnswer }}" is wrong.
        </p>
      </div>
    </div>

    <div class="space-y-4 border border-primary-600 rounded-md p-4 my-8">
      <p class="text-lg">
        Correct answers: <span class="text-green-600 font-bold text-2xl">{{ correctAnswersLength }}</span>
      </p>
      <p class="text-lg">
        Wrong answers: <span class="text-red-600 font-bold text-2xl">{{ wrongAnswersLength }}</span>
      </p>
    </div>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <button type="button" class="btn uppercase text-center" @click="resetQuestions">
        NEW
      </button>
      <NuxtLink class="btn uppercase text-center" to="/">
        HOME
      </NuxtLink>
      <NuxtLink class="btn uppercase text-center" :to="`/questions/${difficulty}/${categoryId}?page=1`">
        AGAIN
      </NuxtLink>
    </div>
  </section>
</template>
