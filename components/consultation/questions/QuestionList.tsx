"use client";

import React, { useState } from "react";

import { useSubmitConsultationAnswers } from "@/hooks/useSubmitConsultationAnswers";
import { Question } from "./Question";
import { AnswerChoices } from "./AnswerChoices";
import { Feedback } from "@/components/consultation/Feedback";

import type { AnswerChoices as AnswerChoicesType, Answers } from "@/types";

const questionList = [
  {
    id: 1,
    question: "Are you male and aged between 18-65?",
  },
  {
    id: 2,
    question: "Are you suffering from hair loss?",
  },
  {
    id: 3,
    question: "Do you have a healthy scalp?",
    points: [
      "no inflammation on the scalp",
      "no redness",
      "no medical dressings",
      "unshaven",
    ],
  },
  {
    id: 4,
    question: "Do you have sudden unexplained hair loss or complete hair loss?",
  },
  {
    id: 5,
    question:
      "Have you ever been diagnosed with one of the following conditions:",
    points: [
      "Prostate problems (prostate enlargement, prostatitis, prostate cancer)",
      "Male breast cancer",
      "Heart Disease (including chest pain, angina, heart attack or any history of cardiovascular event)",
      "High Blood Pressure",
      "Pheochromocytoma (cancer of the adrenal glands)",
    ],
  },
];

export function Questions() {
  const [activeQuestionIndexes, setActiveQuestionIndexes] = useState([1]);
  const [answers, setAnswers] = useState<Array<Answers>>([]);

  const { submitAnswers, isSuccess, isError, isPending } =
    useSubmitConsultationAnswers({
      answers,
    });

  function handleOnAnswer(
    questionIndex: number,
    question: string,
    answer: AnswerChoicesType,
  ) {
    setActiveQuestionIndexes((prev) => [...prev, questionIndex + 1]);
    setAnswers((prev) => [...prev, { question, answer }]);
    if (activeQuestionIndexes.length === questionList.length) {
      submitAnswers();
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      {questionList
        .filter(({ id }) => activeQuestionIndexes.includes(id))
        .map(({ id, question, points }, index) => (
          <div
            key={id}
            className="flex justify-between flex-col md:flex-row md:items-center [&:not(:first-child)]:animate-translate"
          >
            <Question question={question} points={points} />
            <AnswerChoices
              onChange={handleOnAnswer}
              question={question}
              index={index}
              id={id}
              allQuestionsAnswered={
                activeQuestionIndexes.length - 1 === questionList.length
              }
            />
          </div>
        ))}
      {isPending && <Feedback>Submitting answers...</Feedback>}
      {isError && (
        <Feedback>
          Sorry, something went wrong. Please contact the helpdesk for further
          help.
        </Feedback>
      )}
      {isSuccess && (
        <Feedback>
          Thankyou, your answers have been submitted. We will be in touch
          shortly.
        </Feedback>
      )}
    </div>
  );
}
