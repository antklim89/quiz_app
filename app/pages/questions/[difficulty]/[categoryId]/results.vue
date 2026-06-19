<script setup lang="ts">
const categoryId = useCategoryId();
const difficulty = useDifficulty();

const { pending, error } = useQuestionsFetch({ categoryId: categoryId.value, difficulty: difficulty.value });
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <UiLoading />
    </template>
    <UiLoading v-if="pending" />
    <UiErrorComponent v-else-if="error" :error="error" />
    <Results v-else :category-id="categoryId" :difficulty="difficulty" />
  </ClientOnly>
</template>
