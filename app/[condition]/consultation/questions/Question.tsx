import React from "react";

type QuestionProps = {
  question: string;
  points?: Array<string>;
};

export function Question({ question, points }: QuestionProps) {
  return (
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
  );
}
