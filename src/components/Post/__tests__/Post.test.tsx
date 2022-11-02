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
        setPosts={mockFn}
        post={testPost}
        setToCurrentPost={mockFn}
        key={1}
        index={1}
        handleLike={mockFn}
        handleRetweet={mockFn}
        handleComment={mockFn}
      />
    </BrowserRouter>
  );
});

it("post username renders", () => {
  render(
    <BrowserRouter>
      <Post
        posts={testPosts}
        setPosts={mockFn}
        setToCurrentPost={mockFn}
        post={testPost}
        handleLike={mockFn}
        handleRetweet={mockFn}
        handleComment={mockFn}
        index={1}
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
        setPosts={mockFn}
        setToCurrentPost={mockFn}
        post={testPost}
        handleLike={mockFn}
        handleRetweet={mockFn}
        handleComment={mockFn}
        index={1}
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
          posts={testPosts}
          setPosts={mockFn}
          setToCurrentPost={mockFn}
          post={testPost}
          handleLike={mockFn}
          handleRetweet={mockFn}
          handleComment={mockFn}
          index={1}
          key={1}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
