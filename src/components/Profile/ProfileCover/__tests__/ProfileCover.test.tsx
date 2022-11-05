import React from "react";
import { ProfileCover } from "../ProfileCover";

import {
  screen,
  render,
  cleanup,
  getElementError,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import { testUser } from "consts/TestMocks";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <ProfileCover user={testUser} handleChange={mockFn} />
    </BrowserRouter>
  );
});

afterEach(cleanup);
it("render the userImg correctly", () => {
  render(
    <BrowserRouter>
      <ProfileCover user={testUser} handleChange={mockFn} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("profileName")).toHaveTextContent(
    testUser.userName
  );
});
