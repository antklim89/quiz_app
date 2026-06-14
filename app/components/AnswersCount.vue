<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


interface Props {
  categoryId: CategoryId;
  difficulty: Difficulty;
}

const props = defineProps<Props>();
const { answersLength } = useQuestionsStore(props);
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
