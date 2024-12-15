import type {
  Difficulty,
  QuestionResponse,
  QuestionStore,
  QuestionType,
  QuestionTypeType,
} from '~/types';
import { decodeHtml } from './decode-html';


export function questionTransform(questionResponse: QuestionResponse): QuestionStore {
  const questions: QuestionStore = questionResponse.results.reduce((acc, question, index) => {
    const type = question.type as QuestionTypeType;

    const incorrectAnswers = question.incorrect_answers.map(decodeHtml);
    const correctAnswer = decodeHtml(question.correct_answer);

    acc[index + 1] = {
      type,
      category: question.category,
      question: decodeHtml(question.question),
      answers: sortAnswers(type, [correctAnswer, ...incorrectAnswers]),
      correctAnswer,
      incorrectAnswers,
      difficulty: question.difficulty as Difficulty,
      selectedAnswer: undefined,
    };
    return acc;
  }, {} as Record<string, QuestionType>);

  return questions;
}

function sortAnswers(type: QuestionTypeType, answers: string[]): string[] {
  if (type === 'multiple') return answers.sort(() => Math.random() - 0.5);
  if (type === 'boolean') return answers.sort(a => a === 'True' ? -1 : 1);
  return answers;
}
