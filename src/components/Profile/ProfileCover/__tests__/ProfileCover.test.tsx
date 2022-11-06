import React from "react";
import { ProfileCover } from "../ProfileCover";

import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import { testUser } from "consts/TestMocks";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <ProfileCover
        setMessanger={mockFn}
        toggleIsOnFollowers={mockFn}
        isOnFollowers={true}
        user={testUser}
        handleChange={mockFn}
      />
    </BrowserRouter>
  );
});

afterEach(cleanup);
it("render the users name correctly", () => {
  render(
    <BrowserRouter>
      <ProfileCover
        setMessanger={mockFn}
        toggleIsOnFollowers={mockFn}
        isOnFollowers={true}
        user={testUser}
        handleChange={mockFn}
      />
    </BrowserRouter>
  );
  expect(screen.getByTestId("profileName")).toHaveTextContent(
    testUser.userName
  );
});

afterEach(cleanup);
it("render the users @ correctly", () => {
  render(
    <BrowserRouter>
      <ProfileCover
        setMessanger={mockFn}
        toggleIsOnFollowers={mockFn}
        isOnFollowers={true}
        user={testUser}
        handleChange={mockFn}
      />
    </BrowserRouter>
  );
  expect(screen.getByTestId("profileAt")).toHaveTextContent(testUser.userAt);
});
