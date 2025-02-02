import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page from "./page";
import ProviderLayer from "@/app/ProviderLayer";
import { submitConsultationAnswers } from "@/actions/submit-consultation-answers/submitConsultationAnswers";

jest.mock("@/actions/submit-consultation-answers/submitConsultationAnswers");

describe("Page", () => {
  it("renders a heading that matches the dynamic param without hyphens", () => {
    const { getByRole } = render(
      <ProviderLayer>
        <Page params={{ condition: "mock-condition" }} />
      </ProviderLayer>,
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Consultation for mock condition",
    );
  });

  it("shows next question when an answer is selected", async () => {
    const { getAllByRole, getByRole } = render(
      <ProviderLayer>
        <Page params={{ condition: "mock-condition" }} />
      </ProviderLayer>,
    );

    // pre-assert only one question is visible
    expect(getAllByRole("radio").length).toBe(2);

    // act
    await userEvent.click(getByRole("radio", { name: "Yes" }));

    // assert next question is visible
    expect(getAllByRole("radio").length).toBe(4);
  });

  it("shows success message when all questions are answered and submit is successful", async () => {
    const { getAllByRole, getByText } = render(
      <ProviderLayer>
        <Page params={{ condition: "mock-condition" }} />
      </ProviderLayer>,
    );

    await userEvent.click(getAllByRole("radio", { name: "No" })[0]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[1]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[2]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[3]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[4]);

    expect(
      getByText(
        "Thankyou, your answers have been submitted. We will be in touch shortly.",
      ),
    ).toBeVisible();
  });

  it("shows error message when all questions are answered and submit is unsuccessful", async () => {
    (
      submitConsultationAnswers as jest.MockedFunction<
        typeof submitConsultationAnswers
      >
    ).mockRejectedValue("x");

    const { getAllByRole, getByText } = render(
      <ProviderLayer>
        <Page params={{ condition: "mock-condition" }} />
      </ProviderLayer>,
    );

    await userEvent.click(getAllByRole("radio", { name: "No" })[0]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[1]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[2]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[3]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[4]);

    expect(
      getByText(
        "Sorry, something went wrong. Please contact the helpdesk for further help.",
      ),
    ).toBeVisible();
  });

  it("shows loading message when all questions are answered and submit is pending", async () => {
    (submitConsultationAnswers as jest.Mock).mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // add delay to allow test to assert loading state
      return { question: "x", answer: "Yes" };
    });

    const { getAllByRole, getByText } = render(
      <ProviderLayer>
        <Page params={{ condition: "mock-condition" }} />
      </ProviderLayer>,
    );

    await userEvent.click(getAllByRole("radio", { name: "No" })[0]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[1]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[2]);
    await userEvent.click(getAllByRole("radio", { name: "Yes" })[3]);
    await userEvent.click(getAllByRole("radio", { name: "No" })[4]);

    expect(getByText("Submitting answers...")).toBeVisible();
  });
});
