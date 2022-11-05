import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { testPost, testPosts } from "../../../consts/TestMocks";
import { handleLike } from "utils/handleLike";
import { handleRetweet } from "utils/handleRetweet";

const handleClickMockFn = jest.fn();
const mockFn = jest.fn();

afterEach(cleanup);
it("comment button handles click", () => {
  render(
    <PostInteraction
      makeCurrentPost={mockFn}
      index={1}
      post={testPost}
      setPosts={handleClickMockFn}
      posts={testPosts}
      isUsersPost={false}
    />
  );
  fireEvent.click(screen.getByTestId("commentButton"));
  expect(mockFn).toBeCalled();
});
