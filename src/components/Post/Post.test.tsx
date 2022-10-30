/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { Post } from './Post'

import { screen, render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";

import renderer from 'react-test-renderer'

const handleComment = () => {}
const handleRetweet = () => {}
const handleLike = () => {}

afterEach(cleanup)
it("render without crashing", () => {
    render(<Post
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
        handleComment={handleComment}
        handleRetweet={handleRetweet}
        handleLike={handleLike}
    />)
})

it("post username renders", () => {
    render(<Post 
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
        handleComment={handleComment}
        handleRetweet={handleRetweet}
        handleLike={handleLike}/>)
    const element =  screen.getByTestId("post")
    expect(element).toHaveTextContent('test-name')
})

it("post image renders", () => {
    render(<Post 
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
        handleComment={handleComment}
        handleRetweet={handleRetweet}
        handleLike={handleLike}/>)
    const image =  screen.getByAltText<HTMLImageElement>("media")
    expect(image.src).toContain('test-media')
})

 
it("matched snapshot", () => {
    const tree = renderer.create(<Post 
        key={1}
        postData={[]} 
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
        handleComment={handleComment}
        handleRetweet={handleRetweet}
        handleLike={handleLike}/>).toJSON()
    expect(tree).toMatchSnapshot()
})
