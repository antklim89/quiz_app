import type {
  CategoryId,
  Difficulty,
  QuestionStore,
  QuestionType,
} from '~/types';


export function useQuestionsStore({ categoryId, difficulty }: { categoryId: CategoryId; difficulty: Difficulty }) {
  const questions = useState<QuestionStore | null>(`questions:${categoryId}:${difficulty}`);

  onMounted(() => {
    questions.value = loadQuestionsFromLocalStorage({ categoryId, difficulty });
  });

  watchEffect(() => {
    if (!questions.value) return;
    saveQuestionsToLocalStorage({ questions: questions.value, categoryId, difficulty });
  });

  function useQuestionsFetch() {
    return useAsyncData(`questions:${categoryId}:${difficulty}`, async () => {
      if (questions.value != null) return;
      const fetchedQuestions = await fetchQuestions({ difficulty, categoryId });
      questions.value = fetchedQuestions;
    }, { server: false, lazy: true });
  }

  function getQuestion(index: ComputedRef<number>) {
    return computed(() => {
      return questions.value?.[index.value];
    });
  }

  function setSelectedValue(question: QuestionType, answer: string) {
    question.selectedAnswer = answer;
  }
  function resetQuestions() {
    questions.value = null;
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
    useQuestionsFetch,
    getQuestion,
    setSelectedValue,
  };
}
