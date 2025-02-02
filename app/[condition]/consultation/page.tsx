import React from "react";

import { removeHyphens } from "@/utils/removeHyphens";
import { Questions } from "./questions/QuestionsList";

type ConsultationProps = {
  params: {
    condition: string;
  };
};

function Consultation({ params }: ConsultationProps) {
  const { condition } = params;

  return (
    <div className="w-8/12 mx-auto">
      <h1 className="text-2xl pb-8">
        Consultation for
        <span className="font-bold first-letter:capitalize">
          {" "}
          {removeHyphens(condition)}
        </span>
      </h1>
      <Questions />
    </div>
  );
}

export default Consultation;
