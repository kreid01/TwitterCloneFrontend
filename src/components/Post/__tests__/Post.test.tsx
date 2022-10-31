/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { Post } from '../Post'
import { testPost } from '../../../consts/TestPost'

import { screen, render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("render without crashing", () => {
    render(<Post
        post={testPost}
        key={1}
        id={1}
        userName={'test-name'}
        userAt={'test-at'}
        userImg={'test-img'}
        postTextBody={'text-body'}
        postMedia={'test-media'}
        postDate={'test-date'}
        commentCount={1}
        likeCount={1}
        retweetCount={1}
    />)
})

it("post username renders", () => {
    render(<Post
        post={testPost} 
        key={1}
        id={1}
        userName={'test-name'}
        userAt={'test-at'}
        userImg={'test-img'}
        postTextBody={'text-body'}
        postMedia={'test-media'}
        postDate={'test-date'}
        commentCount={1}
        likeCount={1}
        retweetCount={1}/>)
    const element =  screen.getByTestId("post")
    expect(element).toHaveTextContent('test-name')
})

it("post image renders", () => {
    render(<Post
        post={testPost} 
        key={1}
        id={1}
        userName={'test-name'}
        userAt={'test-at'}
        userImg={'test-img'}
        postTextBody={'text-body'}
        postMedia={'test-media'}
        postDate={'test-date'}
        commentCount={1}
        likeCount={1}
        retweetCount={1}/>)
    const image =  screen.getByTestId<HTMLImageElement>("media")
    expect(image.src).toContain('test-media')
})

 
it("matched snapshot", () => {
    const tree = renderer.create(<Post 
        post={testPost}
        key={1}
        id={1}
        userName={'test-name'}
        userAt={'test-at'}
        userImg={'test-img'}
        postTextBody={'text-body'}
        postMedia={'test-media'}
        postDate={'test-date'}
        commentCount={1}
        likeCount={1}
        retweetCount={1}/>).toJSON()
    expect(tree).toMatchSnapshot()
})
