<script setup lang="ts">
import type { CategoryId, Difficulty } from '~/types';


interface Props {
  categoryId: CategoryId;
  difficulty: Difficulty;
  page: number;
}

const props = defineProps<Props>();
const { setSelectedValue, getQuestion } = useQuestionsStore(props);
const question = computed(() => getQuestion(props.page));

function listener(e: KeyboardEvent) {
  question.value.answers.forEach((answer, index) => {
    if (e.key === String(index + 1)) setSelectedValue(question.value, answer);
  });
}

onMounted(() => window.addEventListener('keydown', listener));
onUnmounted(() => window.removeEventListener('keydown', listener));
</script>


<template>
  <section class="space-y-12 my-4 md:my-8">
    <h2 id="question-title" class="text-2xl font-bold text-center">
      {{ question.category }}
    </h2>
    <div>
      <p class="text-lg text-center">
        {{ question.question }}
      </p>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      <button
        v-for="answer, index in question.answers" :key="answer"
        :class="{ 'bg-green-600!': question.selectedAnswer === answer }" class="btn w-full relative"
        @click="setSelectedValue(question, answer)"
      >
        <span class="border-2 size-6 flex justify-center items-center absolute left-6 rounded-md">
          {{ index + 1 }}
        </span>
        <span> {{ answer }}</span>
      </button>
    </div>
  </section>
</template>
