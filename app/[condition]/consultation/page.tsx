"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { RadioButton } from "@/components/consultation/RadioButton";
import { removeHyphens } from "@/utils/removeHyphens";

const questions = [
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

function Consultation() {
  const { condition } = useParams<{ condition: string }>();

  const [activeQuestionIndexes, setActiveQuestionIndexes] = useState([1]);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  function handleOnAnswer(questionIndex: number) {
    setActiveQuestionIndexes((prev) => [...prev, questionIndex + 1]);
    setAllQuestionsAnswered(activeQuestionIndexes.length === questions.length);
  }

  return (
    <main className="w-8/12 mx-auto">
      <h1 className="text-2xl pb-8">
        Consultation for
        <span className="font-bold first-letter:capitalize">
          {" "}
          {removeHyphens(condition)}
        </span>
      </h1>
      <div className="flex flex-col gap-y-8">
        {questions
          .filter(({ id }) => activeQuestionIndexes.includes(id))
          .map(({ id, question, points }, index) => (
            <div key={id} className="flex justify-between items-center">
              <div className="pb-4 font-mono">
                <h3>{question}</h3>
                {points && (
                  <ul className="text-xs text-gray-500">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-x-6">
                {["Yes", "No"].map((value) => (
                  <RadioButton
                    disabled={allQuestionsAnswered}
                    key={value}
                    id={`${id}`}
                    name={`${id}-radio-buttons`}
                    value={value}
                    onChange={() => handleOnAnswer(index + 1)}
                  />
                ))}
              </div>
            </div>
          ))}
        {allQuestionsAnswered && (
          <p className="text-center text-xl">
            Thankyou, your answers have been submitted. We will be in touch
            shortly.
          </p>
        )}
      </div>
    </main>
  );
}

export default Consultation;
