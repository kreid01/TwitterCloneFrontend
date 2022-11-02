import React from "react";
import { CreatePost } from "../CreatePost";

import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import renderer from "react-test-renderer";

const mockFn = jest.fn();

afterEach(cleanup);
it("matched snapshot", () => {
  const tree = renderer.create(<CreatePost setPosts={mockFn} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders without crashing", () => {
  render(<CreatePost setPosts={mockFn} />);
});
