import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import { testPost } from '../../../consts/TestPost'

const handleClickMockFn = jest.fn()


afterEach(cleanup)
it("comment button handles click", () => {
    render(<PostInteraction
    post={testPost}
     handleComment={handleClickMockFn} 
     handleLike={handleClickMockFn}
     handleRetweet={handleClickMockFn}
     likeCount={1}
     retweetCount={1}
     commentCount={1}
     id={1}
     />)
     fireEvent.click(screen.getByTestId('commentButton'))
     expect(handleClickMockFn).toBeCalled()
})

it("like button handles click", () => {
    render(<PostInteraction
    post={testPost}
     handleComment={handleClickMockFn} 
     handleLike={handleClickMockFn}
     handleRetweet={handleClickMockFn}
     likeCount={1}
     retweetCount={1}
     commentCount={1}
     id={1}
     />)
     fireEvent.click(screen.getByTestId('likeButton'))
     expect(handleClickMockFn).toBeCalled()
})

it("retweet button handles click", () => {
    render(<PostInteraction
    post={testPost}
     handleComment={handleClickMockFn} 
     handleLike={handleClickMockFn}
     handleRetweet={handleClickMockFn}
     likeCount={1}
     retweetCount={1}
     commentCount={1}
     id={1}
     />)
     fireEvent.click(screen.getByTestId('retweetButton'))
     expect(handleClickMockFn).toBeCalled()
})