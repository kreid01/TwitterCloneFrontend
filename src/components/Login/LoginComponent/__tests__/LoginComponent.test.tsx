import React from "react";
import { LoginComponent } from "../LoginComponent";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn();

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <BrowserRouter>
      <LoginComponent openLoginPage={mockFn} />
    </BrowserRouter>
  );
});

it("handles submit", async () => {
  render(
    <BrowserRouter>
      <LoginComponent openLoginPage={mockFn} />
    </BrowserRouter>
  );
  const element = screen.getByTestId("loginSubmission");
  fireEvent.click(element);
  expect(mockFn).toBeCalled();
});
