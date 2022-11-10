import React from "react";
import { ProfileHeader } from "../ProfileHeader";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import { testUser } from "consts/TestMocks";

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <ProfileHeader user={testUser} />
    </BrowserRouter>
  );
});

it("back button takes user to home", () => {
  render(
    <BrowserRouter>
      <ProfileHeader user={testUser} />
    </BrowserRouter>
  );
  fireEvent.click(screen.getByTestId("backButton"));
  expect(window.location.pathname).toBe("/home");
});
