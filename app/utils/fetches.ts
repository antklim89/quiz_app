import { AMOUNT } from '~/constants';
import type {
  CategoryId,
  Difficulty,
  Question,
  QuestionResponse,
} from '~/types';


export async function fetchQuestions({
  categoryId,
  difficulty,
}: {
  categoryId: CategoryId;
  difficulty: Difficulty;
}): Promise<Question[]> {
  const questionsStored = useQuestionsStore({ categoryId, difficulty });
  if (questionsStored.value.questions.length !== 0) return questionsStored.value.questions;

  const { public: { apiURL } } = useRuntimeConfig();
  const { results: questionsResponse } = await $fetch<QuestionResponse>(apiURL, {
    params: {
      amount: AMOUNT,
      difficulty,
      category: categoryId,
    },
  });
  questionsStored.value.questions = questionsResponse;

  return questionsResponse;
}
