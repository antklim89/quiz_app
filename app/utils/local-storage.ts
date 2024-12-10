import type { CategoryId, Difficulty, Question } from '~/types';


interface StoragePayload {
  questions: Question[];
  answers: Record<string, string>;
}

interface StorageKeys {
  categoryId: CategoryId;
  difficulty: Difficulty;
}

export function saveQuestionsToLocalStorage({
  questions,
  answers,
  categoryId,
  difficulty,
}: StoragePayload & StorageKeys) {
  const payload: StoragePayload = { questions, answers };
  localStorage.setItem(`questions:${difficulty}:${categoryId}`, JSON.stringify(payload));
}

export function loadQuestionsFromLocalStorage({
  categoryId,
  difficulty,
}: StorageKeys): null | StoragePayload {
  const questionsStr = localStorage.getItem(`questions:${difficulty}:${categoryId}`);
  if (questionsStr == null) return null;

  try {
    const questionsJson = JSON.parse(questionsStr) as StoragePayload;
    return questionsJson;
  } catch {
    return null;
  }
}
