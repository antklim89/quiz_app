import type { CATEGORIES, DIFFICULTIES } from './constants';


export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionResponse {
  response_code: number;
  results: Question[];
}

export type CategoryName = keyof typeof CATEGORIES;
export type CategoryId = typeof CATEGORIES[CategoryName];
export type Difficulty = typeof DIFFICULTIES[number];
