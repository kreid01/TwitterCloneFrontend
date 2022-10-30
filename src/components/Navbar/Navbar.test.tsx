/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { Navbar } from './Navbar'

import { screen, render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import renderer from 'react-test-renderer'

it("matched snapshot", () => {
    const tree = renderer.create(
        <BrowserRouter>
           <Navbar/>
        </BrowserRouter>
      ).toJSON()
      expect(tree).toMatchSnapshot()     
})

afterEach(cleanup)
it("is in document", () => {
    <BrowserRouter>
            <Navbar/>
    </BrowserRouter>
    const nav = screen.getByTestId("nav")
    expect(nav).toBeInTheDocument()
})

 
