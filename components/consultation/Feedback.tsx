import React, { PropsWithChildren } from "react";

type FeedbackProps = PropsWithChildren;

export function Feedback({ children }: FeedbackProps) {
  return <p className="text-center text-xl">{children}</p>;
}
