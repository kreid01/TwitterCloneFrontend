/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { testComment } from "consts/TestMocks";
import { Comment } from "../Comment";
import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <Comment comment={testComment} />
    </BrowserRouter>
  );
});

it("post image renders", () => {
  render(
    <BrowserRouter>
      <Comment comment={testComment} />
    </BrowserRouter>
  );
  const image = screen.getByTestId<HTMLImageElement>("media");
  expect(image.src).toContain("test-media");
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Comment comment={testComment} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
