<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const {
  categoryId,
  difficulty,
} = defineProps<{
  categoryId: CategoryId;
  difficulty: Difficulty;
}>();
const questionsStore = useQuestionsStore({ categoryId, difficulty });
const answersLength = computed(() => questionsStore.value ? Object.values(questionsStore.value).filter(i => i.selectedAnswer != null).length : 0);
</script>

<template>
  <section class="flex flex-col gap-4">
    <p class="text-center text-3xl">
      You answered {{ answersLength }} out of {{ AMOUNT }} questions.
    </p>
    <NuxtLink
      :tabindex="answersLength !== AMOUNT ? -1 : 0"
      :class="{ 'opacity-50 pointer-events-none': answersLength !== AMOUNT }"
      class="btn"
      :to="answersLength !== AMOUNT ? undefined : `/questions/${difficulty}/${categoryId}/results`"
    >
      Show results
    </NuxtLink>
  </section>
</template>
