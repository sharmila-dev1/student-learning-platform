import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function WelcomeMessage() {
  return <h1>Welcome to LearnHub</h1>;
}

describe("WelcomeMessage component", () => {
  it("displays the welcome message", () => {
    render(<WelcomeMessage />);

    expect(
      screen.getByRole("heading", { name: "Welcome to LearnHub" }),
    ).toBeInTheDocument();
  });
});
