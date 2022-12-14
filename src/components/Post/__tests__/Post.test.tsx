/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { Post } from "../Post";
import { testPost, testPosts } from "../../../consts/TestMocks";

import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <Post
        posts={testPosts}
        isUsersPost={false}
        setPosts={mockFn}
        makeCurrentPost={mockFn}
        post={testPost}
        key={1}
      />
    </BrowserRouter>
  );
});

it("post username renders", () => {
  render(
    <BrowserRouter>
      <Post
        isUsersPost={false}
        posts={testPosts}
        setPosts={mockFn}
        makeCurrentPost={mockFn}
        post={testPost}
        key={1}
      />
    </BrowserRouter>
  );
  const element = screen.getByTestId("post");
  expect(element).toHaveTextContent("test-name");
});

it("post image renders", () => {
  render(
    <BrowserRouter>
      <Post
        posts={testPosts}
        isUsersPost={false}
        setPosts={mockFn}
        post={testPost}
        makeCurrentPost={mockFn}
        key={1}
      />
    </BrowserRouter>
  );
  const image = screen.getByTestId<HTMLImageElement>("media");
  expect(image.src).toContain("test-media");
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Post
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
