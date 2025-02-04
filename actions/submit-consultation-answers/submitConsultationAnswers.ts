import type { Answer } from "@/components/consultation/questions/types";

export async function submitConsultationAnswers(answers: Array<Answer>) {
  console.log(answers);

  return answers;
}
