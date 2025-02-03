import type { Answers } from "@/components/consultation/questions/types";

export async function submitConsultationAnswers(answers: Array<Answers>) {
  console.log(answers);

  return answers;
}
