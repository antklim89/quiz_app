import type { CATEGORIES, DIFFICULTIES } from './constants';


export type QuestionTypeType = 'multiple' | 'boolean';

export interface QuestionType {
  type: QuestionTypeType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  answers: string[];
  selectedAnswer?: string;
}

export type QuestionStore = Record<string, QuestionType>;

export interface QuestionResponse {
  response_code: number;
  results: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export type CategoryName = keyof typeof CATEGORIES;
export type CategoryId = typeof CATEGORIES[CategoryName];
export type Difficulty = typeof DIFFICULTIES[number];
