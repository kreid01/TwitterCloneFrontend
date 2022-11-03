/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { CurrentPost } from "../CurrentPost";
import { testPost, testPosts } from "consts/TestMocks";

import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <BrowserRouter>
      <CurrentPost
        isUsersPost={false}
        posts={testPosts}
        setPosts={mockFn}
        currentIndex={1}
        post={testPost}
        setToCurrentPost={mockFn}
        key={1}
      />
    </BrowserRouter>
  );
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CurrentPost
          isUsersPost={false}
          posts={testPosts}
          setPosts={mockFn}
          currentIndex={1}
          post={testPost}
          setToCurrentPost={mockFn}
          key={1}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("return button when clicked functions", () => {
  render(
    <BrowserRouter>
      <CurrentPost
        isUsersPost={true}
        setPosts={mockFn}
        posts={testPosts}
        currentIndex={1}
        post={testPost}
        setToCurrentPost={mockFn}
        key={1}
      />
    </BrowserRouter>
  );
  const returnButton = screen.getByTestId("returnButton");
  fireEvent.click(returnButton);
  expect(mockFn).lastCalledWith();
});
