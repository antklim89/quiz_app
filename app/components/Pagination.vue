<script setup lang="ts">
import { AMOUNT } from '~/constants';
import type { CategoryId, Difficulty } from '~/types';


interface Props {
  categoryId: CategoryId;
  difficulty: Difficulty;
  page: number;
}


const props = defineProps<Props>();

const { getQuestion } = useQuestionsStore(props);
const question = computed(() => getQuestion(props.page));

const hasNext = computed(() => props.page < AMOUNT);
const nextLink = computed(() => hasNext.value ? `/questions/${props.difficulty}/${props.categoryId}?page=${props.page + 1}#question-title` : undefined);
const hasPrev = computed(() => props.page > 1);
const prevLink = computed(() => hasPrev.value ? `/questions/${props.difficulty}/${props.categoryId}?page=${props.page - 1}#question-title` : undefined);

function listener(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    if (!question.value.selectedAnswer) return;
    else if (hasNext.value) navigateTo(nextLink.value);
    else navigateTo(`/questions/${props.difficulty}/${props.categoryId}/results`);
  }

  if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    if (hasPrev.value) navigateTo(prevLink.value);
    else navigateTo('/');
  }
}

onMounted(() => window.addEventListener('keydown', listener));
onUnmounted(() => window.removeEventListener('keydown', listener));
</script>


<template>
  <div class="flex justify-between gap-2">
    <NuxtLink
      :tabindex="hasPrev ? 0 : -1"
      :class="{ 'opacity-50 pointer-events-none': !hasPrev }"
      class="btn uppercase"
      :to="prevLink"
    >
      Previous
    </NuxtLink>
    <NuxtLink
      :tabindex="hasNext ? 0 : -1"
      :class="{ 'opacity-50 pointer-events-none': !hasNext || !question.selectedAnswer }"
      class="btn uppercase"
      :to="nextLink"
    >
      Next
    </NuxtLink>
  </div>
</template>
