<script setup lang="ts">
import { CATEGORIES, DIFFICULTIES } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


definePageMeta({
  validate: ({ params }) =>
    !Number.isNaN(Number(params.page || '1'))
    && Number(params.page || '1') > 0
    && Number(params.page || '1') <= 10
    && typeof params.categoryId === 'string'
    && typeof params.difficulty === 'string'
    && Object.keys(CATEGORIES).includes(params.categoryId as CategoryId)
    && DIFFICULTIES.includes(params.difficulty as Difficulty),
});

const route = useRoute();
const page = computed(() => Number.parseInt((route.query.page as string) || '1', 10));
const categoryId = route.params.categoryId as CategoryId;
const difficulty = route.params.difficulty as Difficulty;

const { useQuestionsFetch, getQuestion } = useQuestionsStore({ categoryId, difficulty });
const { pending } = useQuestionsFetch();

const question = getQuestion(page);
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <UiLoading />
    </template>
    <UiLoading v-if="pending" />
    <UiEmpty
      v-else-if="question == null"
      title="No Questions"
      message="There are no questions for this category and difficulty. Please select another category and difficulty."
    />
    <section v-else class="space-y-12 my-4 md:my-8">
      <AnswerSelect
        :page="page"
        :category-id="categoryId"
        :difficulty="difficulty"
        :question="question"
      />
      <AnswersCount
        :category-id="categoryId"
        :difficulty="difficulty"
      />
      <Pagination
        :question="question"
        :page="page"
        :category-id="categoryId"
        :difficulty="difficulty"
      />
    </section>
  </ClientOnly>
</template>
