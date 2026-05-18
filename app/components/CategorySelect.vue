<script setup lang="ts">
import { AMOUNT, DIFFICULTIES } from '~/constants';
import type { CategoryId, CategoryName } from '~/types';


const { categoryName, categoryId } = defineProps<{
  categoryName: CategoryName;
  categoryId: CategoryId;
}>();

const storeArray = computed(() =>
  DIFFICULTIES.map((difficulty) => {
    const { answersLength, lastAnsweredQuestion } = useQuestionsStore({ categoryId, difficulty });
    return { difficulty, answersLength, lastAnsweredQuestion };
  }),
);
</script>

<template>
  <div class="flex flex-col space-y-2 border border-primary-600 rounded-md p-4">
    <h4 class="text-2xl text-center">
      {{ categoryName }}
    </h4>

    <ClientOnly
      v-for="{ answersLength, lastAnsweredQuestion, difficulty } in storeArray"
      :key="difficulty"
      class="flex flex-col space-y-2"
    >
      <NuxtLink v-if="answersLength.value < AMOUNT" class="btn uppercase" :to="`/questions/${difficulty}/${categoryId}?page=${lastAnsweredQuestion.value}`">
        <span>{{ difficulty }} | {{ answersLength }} / {{ AMOUNT }}</span>
      </NuxtLink>

      <NuxtLink v-else class="btn uppercase !bg-green-600 hover:!bg-green-700" :to="`/questions/${difficulty}/${categoryId}/results`">
        <span>{{ difficulty }} | Show results</span>
      </NuxtLink>

      <template #fallback>
        <button class="btn uppercase">
          <span>...</span>
        </button>
      </template>
    </ClientOnly>
  </div>
</template>
