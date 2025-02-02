import type { Answers } from "@/types";

export async function submitConsultationAnswers(answers: Array<Answers>) {
  console.log(answers);

  return answers;
}
