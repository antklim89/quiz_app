import { AMOUNT, type DIFFICULTIES } from './constants';
import type { QuestionResponse } from './types';


export async function fetchQuestions({ difficulty }: { difficulty: typeof DIFFICULTIES[number] }) {
  const url = new URL('', process.env.API_URL);
  url.searchParams.set('amount', String(AMOUNT));
  url.searchParams.set('difficulty', difficulty);

  const res = await $fetch<QuestionResponse>(url.toString());
  return res;
}
