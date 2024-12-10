import type { CategoryId, Difficulty } from '~/types';


export function useQuestionsStore({ categoryId, difficulty }: { difficulty: Difficulty; categoryId: CategoryId }) {
  const storageQuestions = loadQuestionsFromLocalStorage({ categoryId, difficulty });

  const store = useState(`questions:${difficulty}:${categoryId}`, () => ({
    questions: storageQuestions?.questions || [],
    answers: storageQuestions?.answers || {},
  }));

  watchEffect(() => {
    saveQuestionsToLocalStorage({
      questions: store.value.questions,
      answers: store.value.answers,
      categoryId,
      difficulty,
    });
  });

  return store;
}
