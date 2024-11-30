import type { CategoryId, Difficulty, Question } from './types';


export function saveQuestionsToLocalStorage({ questions, categoryId, difficulty }: { questions: Question[]; categoryId: CategoryId; difficulty: Difficulty }) {
  localStorage.setItem(`questions:${difficulty}:${categoryId}`, JSON.stringify(questions));
}

export function loadQuestionsFromLocalStorage({ categoryId, difficulty }: { categoryId: CategoryId; difficulty: Difficulty }): null | Question[] {
  const questionsStr = localStorage.getItem(`questions:${difficulty}:${categoryId}`);
  if (questionsStr == null) return null;

  try {
    const questionsJson = JSON.parse(questionsStr) as Question[];
    return questionsJson;
  } catch {
    return null;
  }
}
