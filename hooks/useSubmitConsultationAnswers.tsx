import { useMutation } from "@tanstack/react-query";
import { submitConsultationAnswers } from "@/actions/submit-consultation-answers/submitConsultationAnswers";

import type { Answers } from "@/components/consultation/questions/types";

export function useSubmitConsultationAnswers({
  answers,
}: {
  answers: Array<Answers>;
}) {
  const { mutate: submitAnswers, ...rest } = useMutation({
    mutationFn: () => {
      return submitConsultationAnswers(answers);
    },
  });

  return { submitAnswers, ...rest };
}
