import type {
  Difficulty,
  QuestionResponse,
  QuestionStore,
  QuestionType,
  QuestionTypeType,
} from '~/types';


export function questionTransform(questionResponse: QuestionResponse): QuestionStore {
  const questions: QuestionStore = questionResponse.results.reduce((acc, question, index) => {
    const type = question.type as QuestionTypeType;

    acc[index + 1] = {
      type,
      category: question.category,
      question: question.question,
      answers: sortAnswers(type, [question.correct_answer, ...question.incorrect_answers]),
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers,
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
