/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { testPost, testPosts } from "consts/TestMocks";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import renderer from "react-test-renderer";
import { CreateComment } from "../CreateComment";

const mockFn = jest.fn();

afterEach(cleanup);
it("renders without crashing", () => {
  render(
    <CreateComment
      post={testPost}
      posts={testPosts}
      setComments={mockFn}
      setPosts={mockFn}
      currentIndex={1}
    />
  );
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <CreateComment
        post={testPost}
        posts={testPosts}
        setComments={mockFn}
        setPosts={mockFn}
        currentIndex={1}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
