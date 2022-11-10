import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render, screen } from "@testing-library/react";
import { testPost, testPosts } from "../../../consts/TestMocks";
import renderer from "react-test-renderer";

const handleClickMockFn = jest.fn();
const mockFn = jest.fn();

afterEach(cleanup);
it("render without crashing", () => {
  render(
    <PostInteraction
      makeCurrentPost={mockFn}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={false}
      index={1}
      post={testPost}
    />
  );
});

it("is user post, then unable to retweet", () => {
  render(
    <PostInteraction
      makeCurrentPost={mockFn}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={true}
      index={1}
      post={testPost}
    />
  );
  expect(screen.queryByTestId("retweetButton")).not.toBeInTheDocument();
});

it("is user post, then unable to like", () => {
  render(
    <PostInteraction
      makeCurrentPost={mockFn}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={true}
      index={1}
      post={testPost}
    />
  );
  expect(screen.queryByTestId("likeButton")).not.toBeInTheDocument();
});

it("matched snapshot", () => {
  const tree = renderer
    .create(
      <PostInteraction
        makeCurrentPost={mockFn}
        setPosts={handleClickMockFn}
        posts={testPosts}
        isUsersPost={false}
        post={testPost}
        index={1}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
