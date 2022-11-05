import React from "react";
import { SignupComponent } from "../SignupComponent";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn();

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <BrowserRouter>
      <SignupComponent openLoginPage={mockFn} />
    </BrowserRouter>
  );
});

it("handles submit", async () => {
  render(
    <BrowserRouter>
      <SignupComponent openLoginPage={mockFn} />
    </BrowserRouter>
  );
  const element = screen.getByTestId("signupSubmission");
  fireEvent.click(element);
  expect(mockFn).toBeCalled();
});
