/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { CommentButton } from '../CommentButton'
import { testPost, testComment } from 'consts/TestMocks';

import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import renderer from 'react-test-renderer'

const mockFn = jest.fn();

const handleTweet = jest.fn()

afterEach(cleanup)
it("render without crashing", () => {
    render(<CommentButton
    label='Reply'
    newComment={testComment}
    post={testPost}
    handleReply={mockFn}/>)
})

it("renders button correctly", () => {
    render(<CommentButton
        label='Reply'
        newComment={testComment}
        post={testPost}
        handleReply={mockFn}/>)
    const element =  screen.getByTestId("replyButton")
    expect(element).toHaveTextContent('Reply')
})

it("calls handleTweeet function when clicked", () => {
    render(<CommentButton
        label='Reply'
        newComment={testComment}
        post={testPost}
        handleReply={mockFn}/>)
    fireEvent.click(screen.getByTestId("replyButton"))
    expect(mockFn).toHaveBeenCalled()
})
 
it("matched snapshot", () => {
    const tree = renderer.create(
    <CommentButton
        label='Reply'
        newComment={testComment}
        post={testPost}
        handleReply={mockFn}/>).toJSON()
    expect(tree).toMatchSnapshot()
})
