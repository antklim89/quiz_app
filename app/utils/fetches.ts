import { AMOUNT } from '~/constants';
import type {
  CategoryId,
  Difficulty,
  QuestionResponse,
} from '~/types';


// eslint-disable-next-line ts/promise-function-async
export function fetchQuestions({
  categoryId,
  difficulty,
}: {
  categoryId: CategoryId;
  difficulty: Difficulty;
}) {
  return useAsyncData(`questions:${categoryId}:${difficulty}`, async () => {
    const questionsStored = useQuestionsStore({ categoryId, difficulty });
    if (questionsStored.value.questions.length !== 0) return questionsStored.value.questions;

    const { public: { apiURL } } = useRuntimeConfig();
    const { results } = await $fetch<QuestionResponse>(apiURL, {
      params: {
        amount: AMOUNT,
        difficulty,
        category: categoryId,
      },
    });

    questionsStored.value.questions = results;

    return results;
  });
}
