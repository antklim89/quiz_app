<script setup lang="ts">
const categoryId = useCategoryId();
const difficulty = useDifficulty();
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <UiLoading />
    </template>
    <Results :category-id="categoryId" :difficulty="difficulty" />
  </ClientOnly>
</template>
