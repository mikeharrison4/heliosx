import React from "react";

import { RadioButton } from "@/components/consultation/RadioButton";

import type { AnswerChoices as AnswerChoicesType } from "@/components/consultation/questions/types";

type AnswerChoicesProps = {
  onChange: (
    index: number,
    id: number,
    question: string,
    value: AnswerChoicesType,
  ) => void;
  question: string;
  index: number;
  id: number;
  allQuestionsAnswered: boolean;
};

export function AnswerChoices({
  onChange,
  question,
  index,
  id,
  allQuestionsAnswered,
}: AnswerChoicesProps) {
  return (
    <div className="flex gap-x-6 md:pl-4">
      {(["Yes", "No"] as Array<AnswerChoicesType>).map((value) => (
        <RadioButton
          disabled={allQuestionsAnswered}
          key={value}
          id={`${id}`}
          name={`${id}-radio-buttons`}
          value={value}
          onChange={() => onChange(index, id, question, value)}
        />
      ))}
    </div>
  );
}
