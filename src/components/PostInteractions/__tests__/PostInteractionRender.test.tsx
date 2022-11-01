import { PostInteraction } from "../PostInteraction";
import "@testing-library/jest-dom";

import { cleanup, render} from '@testing-library/react';
import { testPost } from '../../../consts/TestMocks'
import renderer from 'react-test-renderer'

const handleClickMockFn = jest.fn()

afterEach(cleanup)
it("render without crashing", () => {
    render(<PostInteraction
    index={1}
    post={testPost}
     handleComment={handleClickMockFn} 
     handleLike={handleClickMockFn}
     handleRetweet={handleClickMockFn}
     />)
})

it("matched snapshot", () => {
    const tree = renderer.create(<PostInteraction
        post={testPost}
        index={1}
         handleComment={handleClickMockFn} 
         handleLike={handleClickMockFn}
         handleRetweet={handleClickMockFn}
         />).toJSON()
    expect(tree).toMatchSnapshot()
})
