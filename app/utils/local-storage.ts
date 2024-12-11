import type {
  CategoryId,
  Difficulty,
  QuestionStore,
} from '~/types';


interface StorageKeys {
  categoryId: CategoryId;
  difficulty: Difficulty;
}

export function saveQuestionsToLocalStorage({
  questions,
  categoryId,
  difficulty,
}: { questions: QuestionStore | null } & StorageKeys): void {
  if (questions == null) return;
  localStorage.setItem(`questions:${difficulty}:${categoryId}`, JSON.stringify(questions));
}

export function loadQuestionsFromLocalStorage({
  categoryId,
  difficulty,
}: StorageKeys): null | QuestionStore {
  const questionsStr = localStorage.getItem(`questions:${difficulty}:${categoryId}`);
  if (questionsStr == null) return null;

  try {
    const questionsJson = JSON.parse(questionsStr) as QuestionStore;
    return questionsJson;
  } catch {
    return null;
  }
}
