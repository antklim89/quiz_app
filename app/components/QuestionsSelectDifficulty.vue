<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


const { categoryId, difficulty } = defineProps<{ categoryId: CategoryId; difficulty: Difficulty }>();

const { answersLength, lastAnsweredQuestion } = useQuestionsStore({ categoryId, difficulty });
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col space-y-2">
      <NuxtLink v-if="answersLength < AMOUNT" class="btn uppercase" :to="`/questions/${difficulty}/${categoryId}?page=${lastAnsweredQuestion}`">
        <span>{{ difficulty }} | {{ answersLength }} / {{ AMOUNT }}</span>
      </NuxtLink>

      <NuxtLink v-else class="btn uppercase bg-green-600! hover:bg-green-700!" :to="`/questions/${difficulty}/${categoryId}/results`">
        <span>{{ difficulty }} | Show results</span>
      </NuxtLink>
    </div>

    <template #fallback>
      <button class="btn uppercase">
        {{ difficulty }} | ...
      </button>
    </template>
  </ClientOnly>
</template>
