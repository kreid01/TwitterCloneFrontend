/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { CurrentPost } from "../CurrentPost";
import { testPost, testPosts } from "consts/TestMocks";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <BrowserRouter>
      <CurrentPost
        makeCurrentPost={mockFn}
        isUsersPost={false}
        posts={testPosts}
        setPosts={mockFn}
        post={testPost}
        key={1}
      />
    </BrowserRouter>
  );
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CurrentPost
          makeCurrentPost={mockFn}
          isUsersPost={false}
          posts={testPosts}
          setPosts={mockFn}
          post={testPost}
          key={1}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
