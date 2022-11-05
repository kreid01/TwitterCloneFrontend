/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { LoginButtons } from "../LoginButtons";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn();

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <LoginButtons openLoginPage={mockFn} />
    </BrowserRouter>
  );
});

it("calls handleTweeet function when clicked", () => {
  render(
    <BrowserRouter>
      <LoginButtons openLoginPage={mockFn} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByTestId("signupButton"));
  expect(mockFn).toHaveBeenCalled();
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <LoginButtons openLoginPage={mockFn} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("calls takes user to login", () => {
  render(
    <BrowserRouter>
      <LoginButtons openLoginPage={mockFn} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByTestId("loginButton"));
  expect(window.location.pathname).toBe("/login");
});
