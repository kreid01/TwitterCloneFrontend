import React from "react";
import { PostsList } from "../PostsList";
import { testPosts } from "../../../consts/TestMocks";

import { screen, render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

const mockFn = jest.fn;

afterEach(cleanup);
it("render without crashing", async () => {
  render(
    <BrowserRouter>
      <PostsList
        posts={testPosts}
        setPosts={mockFn}
        hasMore={true}
        loading={true}
        error={true}
        key={1}
      />
    </BrowserRouter>
  );
});

it("loading renders when needed", async () => {
  render(
    <BrowserRouter>
      <PostsList
        posts={testPosts}
        setPosts={mockFn}
        hasMore={true}
        loading={true}
        error={true}
        key={1}
      />
    </BrowserRouter>
  );
  const element = screen.getByText("Loading...");
  expect(element).toBeVisible();
});

it("matched snapshot", async () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <PostsList
          posts={testPosts}
          setPosts={mockFn}
          hasMore={true}
          loading={true}
          error={true}
          key={1}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
