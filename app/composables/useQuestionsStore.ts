import type {
  CategoryId,
  Difficulty,
  QuestionStore,
  QuestionType,
} from '~/types';


export function useQuestionsFetch({ categoryId, difficulty }: { categoryId: CategoryId; difficulty: Difficulty }) {
  return useAsyncData(`questions:${categoryId}:${difficulty}`, async () => {
    const questions = loadQuestionsFromLocalStorage({ categoryId, difficulty });
    if (questions != null) return questions;

    const { error, fetchedQuestions } = await fetchQuestions({ difficulty, categoryId });
    if (error) throw error;
    return fetchedQuestions;
  }, { server: false, lazy: true, deep: true });
}

export function useQuestionsStore({ categoryId, difficulty }: { categoryId: CategoryId; difficulty: Difficulty }) {
  const { data: questions } = useNuxtData<QuestionStore | null>(`questions:${categoryId}:${difficulty}`);

  onMounted(() => {
    questions.value = loadQuestionsFromLocalStorage({ categoryId, difficulty });
  });

  watchEffect(() => {
    if (!questions.value) return;
    saveQuestionsToLocalStorage({ questions: questions.value, categoryId, difficulty });
  });

  function getQuestion(index: number) {
    const question = questions.value?.[index];
    if (!question) throw createError({ unhandled: false, status: 404, statusText: 'There are no questions for this category and difficulty. Please select another category and difficulty.' });
    return question;
  }

  function setSelectedValue(question: QuestionType, answer: string) {
    question.selectedAnswer = answer;
  }

  async function resetQuestions() {
    const { error, fetchedQuestions } = await fetchQuestions({ difficulty, categoryId });
    if (error) throw error;
    questions.value = fetchedQuestions;
  }

  const questionArray = computed(() => questions.value ? Object.values(questions.value) : []);

  const answersLength = computed(() => questionArray.value.filter(i => i.selectedAnswer != null).length);
  const correctAnswersLength = computed(() => questionArray.value.filter(i => i.selectedAnswer === i.correctAnswer).length);
  const wrongAnswersLength = computed(() => questionArray.value.length - correctAnswersLength.value);
  const lastAnsweredQuestion = computed(() => {
    const index = questionArray.value.findIndex(i => i.selectedAnswer == null);
    return index <= 0 ? 1 : index;
  });

  return {
    questions,
    answersLength,
    correctAnswersLength,
    lastAnsweredQuestion,
    wrongAnswersLength,
    resetQuestions,
    getQuestion,
    setSelectedValue,
  };
}
