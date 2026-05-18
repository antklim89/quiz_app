import { AMOUNT } from '~/constants';
import type { QuestionResponse } from '~/types';


export async function fetchQuestions({ difficulty, categoryId }: { difficulty: string; categoryId: string }) {
  const config = useRuntimeConfig();
  const response = await $fetch<QuestionResponse>(config.public.apiURL, {
    params: {
      amount: AMOUNT,
      difficulty,
      category: categoryId,
    },
  });
  const fetchedQuestions = questionTransform(response);
  return fetchedQuestions;
}
