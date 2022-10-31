/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { TweetButton} from '../TweetButton'

import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import renderer from 'react-test-renderer'

const handleTweet = jest.fn()

afterEach(cleanup)
it("render without crashing", () => {
    render(<TweetButton
    label='Tweet'
    handleTweet={handleTweet}/>)
})

it("renders button correctly", () => {
    render(<TweetButton
    label='Tweet'
    handleTweet={handleTweet} />)
    const element =  screen.getByTestId("tweetButton")
    expect(element).toHaveTextContent('Tweet')
})

it("calls handleTweeet function when clicked", () => {
    render(<TweetButton
        label='Tweet'
        handleTweet={handleTweet} />) 
    fireEvent.click(screen.getByTestId("tweetButton"))
    expect(handleTweet).toHaveBeenCalled()
})
 
it("matched snapshot", () => {
    const tree = renderer.create(<TweetButton handleTweet={handleTweet}
    label="Tweet"/>).toJSON()
    expect(tree).toMatchSnapshot()
})
