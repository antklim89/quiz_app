<script lang="ts" setup>
import { CATEGORIES, DIFFICULTIES } from '~/constants';
</script>

<template>
  <QuestionsSelect>
    <QuestionsSelectCategory
      v-for="categoryName, categoryId in CATEGORIES"
      :key="categoryName"
      :category-name="categoryName"
      :category-id="categoryId"
    >
      <QuestionsSelectDifficulty
        v-for="difficulty in DIFFICULTIES"
        :key="difficulty"
        :category-id="categoryId"
        :difficulty="difficulty"
      />
    </QuestionsSelectCategory>
  </QuestionsSelect>
</template>
