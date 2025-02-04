"use client";

import React, { useState } from "react";

import { useSubmitConsultationAnswers } from "@/hooks/useSubmitConsultationAnswers";
import { Question } from "./Question";
import { AnswerChoices } from "./AnswerChoices";
import { Feedback } from "@/components/consultation/Feedback";

import type {
  AnswerChoices as AnswerChoicesType,
  Answer,
} from "@/components/consultation/questions/types";

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
  const [amountOfQuestionsToShow, setAmountOfQuestionsToShow] = useState(1);
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  const { submitAnswers, isSuccess, isError, isPending } =
    useSubmitConsultationAnswers({
      answers,
    });

  function handleOnAnswer(
    index: number,
    id: number,
    question: string,
    answer: AnswerChoicesType,
  ) {
    if (index + 1 === amountOfQuestionsToShow) {
      setAmountOfQuestionsToShow((prev) => prev + 1);
    }

    const answerIndex = answers.findIndex((item) => item.id === id);
    const hasQuestionAlreadyBeenAnswered = answerIndex > -1;
    if (hasQuestionAlreadyBeenAnswered) {
      setAnswers(
        answers.map((item) => {
          if (item.id === id) {
            return { ...item, answer };
          } else {
            return item;
          }
        }),
      );
    } else {
      setAnswers((prev) => [...prev, { id, question, answer }]);
    }

    if (amountOfQuestionsToShow === questionList.length) {
      submitAnswers();
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      {questionList
        .slice(0, amountOfQuestionsToShow)
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
              allQuestionsAnswered={isSuccess || isError || isPending}
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
