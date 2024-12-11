import type { CategoryId, Difficulty, QuestionStore } from '~/types';


export function useQuestionsStore({ categoryId, difficulty }: { difficulty: Difficulty; categoryId: CategoryId }) {
  const storageQuestions = loadQuestionsFromLocalStorage({ categoryId, difficulty });

  const store = useState<QuestionStore | null>(`questions:${difficulty}:${categoryId}`, () => (storageQuestions ?? null));

  watchEffect(() => {
    saveQuestionsToLocalStorage({
      questions: store.value,
      categoryId,
      difficulty,
    });
  });

  return store;
}
