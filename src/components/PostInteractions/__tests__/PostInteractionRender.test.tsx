import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render} from '@testing-library/react';
import { testPost } from '../../../consts/TestPost'
import renderer from 'react-test-renderer'

const handleClickMockFn = jest.fn()

afterEach(cleanup)
it("render without crashing", () => {
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
})

it("matched snapshot", () => {
    const tree = renderer.create(<PostInteraction
        post={testPost}
         handleComment={handleClickMockFn} 
         handleLike={handleClickMockFn}
         handleRetweet={handleClickMockFn}
         likeCount={1}
         retweetCount={1}
         commentCount={1}
         id={1}
         />).toJSON()
    expect(tree).toMatchSnapshot()
})
