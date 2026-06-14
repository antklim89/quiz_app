import { AMOUNT } from '~/constants';
import type { QuestionResponse } from '~/types';


export async function fetchQuestions({ difficulty, categoryId }: { difficulty: string; categoryId: string }) {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.apiURL}?amount=${AMOUNT}&difficulty=${difficulty}&category=${categoryId}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          fetchedQuestions: null,
          error: createError({ message: 'Question not found.', status: response.status }),
        };
      }
      if (response.status === 429) {
        return {
          fetchedQuestions: null,
          error: createError({ message: 'Too many requests. Wait and try again.', status: response.status }),
        };
      }
      return {
        fetchedQuestions: null,
        error: createError({ message: 'Unexpected error. Try again later.', status: 500 }),
      };
    }

    const responseData = await response.json() as QuestionResponse;
    const fetchedQuestions = questionTransform(responseData);
    return {
      fetchedQuestions,
      error: null,
    };
  } catch {
    return {
      fetchedQuestions: null,
      error: createError({ message: 'Unexpected error. Try again later.', status: 500 }),
    };
  }
}
