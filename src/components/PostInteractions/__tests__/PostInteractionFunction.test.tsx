import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { testPost, testPosts } from "../../../consts/TestMocks";

const handleClickMockFn = jest.fn();

afterEach(cleanup);
it("comment button handles click", () => {
  render(
    <PostInteraction
      index={1}
      post={testPost}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={false}
    />
  );
  fireEvent.click(screen.getByTestId("commentButton"));
  expect(handleClickMockFn).toBeCalled();
});

it("like button handles click", () => {
  render(
    <PostInteraction
      index={1}
      post={testPost}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={false}
    />
  );
  fireEvent.click(screen.getByTestId("likeButton"));
  expect(handleClickMockFn).toBeCalled();
});

it("retweet button handles click", () => {
  render(
    <PostInteraction
      index={1}
      post={testPost}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={false}
    />
  );
  fireEvent.click(screen.getByTestId("retweetButton"));
  expect(handleClickMockFn).toBeCalled();
});
