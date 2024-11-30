import { AMOUNT } from './constants';
import { loadQuestionsFromLocalStorage, saveQuestionsToLocalStorage } from './local-storage';
import type {
  CategoryId,
  Difficulty,
  QuestionResponse,
} from './types';


// eslint-disable-next-line ts/promise-function-async
export function useFetchQuestions({
  categoryId,
  difficulty,
}: {
  categoryId: CategoryId;
  difficulty: Difficulty;
}) {
  if (!import.meta.server) {
    const questions = loadQuestionsFromLocalStorage({ categoryId, difficulty });
    if (questions) {
      return useAsyncData(`questions:${difficulty}:${categoryId}`, async () => ({
        response_code: 0,
        results: questions,
      }));
    }
  }

  const { public: { apiURL } } = useRuntimeConfig();
  const response = useFetch<QuestionResponse>(apiURL, {
    params: {
      amount: AMOUNT,
      difficulty,
      category: categoryId,
    },
    server: false,
  });

  if (!import.meta.server) {
    watch(response.data, () => {
      const results = response.data.value?.results;
      if (results == null) return;
      saveQuestionsToLocalStorage({ questions: results, categoryId, difficulty });
    });
  }
  return response;
}
