<script setup lang="ts">
import { AMOUNT, CATEGORIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


interface Props {
  categoryId: CategoryId;
  difficulty: Difficulty;
}

const props = defineProps<Props>();
const loading = ref(false);
const {
  lastAnsweredQuestion,
  questions,
  correctAnswersLength,
  wrongAnswersLength,
  answersLength,
  resetQuestions,
} = useQuestionsStore(props);

async function navigateToNewQuestions() {
  loading.value = true;
  try {
    await resetQuestions();
    await navigateTo(`/questions/${props.difficulty}/${props.categoryId}`);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="my-12">
    <header class="space-y-4 my-8">
      <h1 class="text-4xl text-center mb-8">
        Results
      </h1>

      <h2 class="text-2xl text-center">
        {{ CATEGORIES[props.categoryId] }}
      </h2>

      <h2 class="text-2xl text-center uppercase">
        {{ props.difficulty }}
      </h2>
    </header>

    <UiErrorComponent
      v-if="answersLength < AMOUNT"
      :clear-error="() => clearError({ redirect: `/questions/${props.difficulty}/${props.categoryId}?page=${lastAnsweredQuestion + 1}` })"
      error-button-text="CONTINUE"
      :error="createError({ message: `You have answered ${answersLength} out of ${AMOUNT} questions. Please answer all questions to show results.`, status: 400 })"
    />

    <div v-else>
      <div class="space-y-6">
        <div
          v-for="question in questions"
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
    </div>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <button type="button" class="btn uppercase text-center" @click="navigateToNewQuestions">
        {{ loading ? 'LOADING...' : 'NEW' }}
      </button>
      <NuxtLink class="btn uppercase text-center" to="/">
        HOME
      </NuxtLink>
      <NuxtLink class="btn uppercase text-center" :to="`/questions/${props.difficulty}/${props.categoryId}?page=1`">
        REPEAT
      </NuxtLink>
    </div>
  </section>
</template>
