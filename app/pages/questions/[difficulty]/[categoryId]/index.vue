<script setup lang="ts">
import { useCategoryId } from '~/composables/useCategoryId';
import { useDifficulty } from '~/composables/useDifficulty';


const categoryId = useCategoryId();
const difficulty = useDifficulty();
const page = usePage();

const { useQuestionsFetch } = useQuestionsStore({ categoryId: categoryId.value, difficulty: difficulty.value });
const { pending, error } = useQuestionsFetch();
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <UiLoading />
    </template>
    <UiLoading v-if="pending" />
    <UiErrorComponent v-else-if="error" :error="error" />
    <section v-else class="space-y-12 my-4 md:my-8">
      <AnswerSelect :page="page" :category-id="categoryId" :difficulty="difficulty" />
      <AnswersCount :category-id="categoryId" :difficulty="difficulty" />
      <Pagination :page="page" :category-id="categoryId" :difficulty="difficulty" />
    </section>
  </ClientOnly>
</template>
