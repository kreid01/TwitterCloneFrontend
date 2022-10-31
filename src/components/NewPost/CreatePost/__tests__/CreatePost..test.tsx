import React from 'react'
import { CreatePost } from '../CreatePost'

import { cleanup, render } from '@testing-library/react';
import "@testing-library/jest-dom";

import renderer from 'react-test-renderer'

const handleTweet = () => {}
const setNewPost = () => {}
const handleChange = () => {}

afterEach(cleanup)
it("matched snapshot", () => {
    const tree = renderer.create(
        <CreatePost
        newPost={{
            postTextBody:'',
            postMedia: '' }}
        handleTweet={handleTweet}
        handleChange={handleChange}
        setNewPost={setNewPost}/>
      ).toJSON()
      expect(tree).toMatchSnapshot()     
})

it("renders without crashing", () => {
    render(
        <CreatePost
        newPost={{
            postTextBody:'',
            postMedia: '' }}
        handleTweet={handleTweet}
        handleChange={handleChange}
        setNewPost={setNewPost}/>)   
})
