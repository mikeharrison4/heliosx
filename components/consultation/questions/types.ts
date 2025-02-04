export type AnswerChoices = "Yes" | "No";

export type Answer = {
  id: number;
  question: string;
  answer: AnswerChoices;
};
