import React from 'react'
import { FileUpload } from '../FileUpload'

import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";


const handleFileUploadMockFn = jest.fn()

afterEach(cleanup)
it('input change called the handle change function', () => {
    render(
        <FileUpload
        handleFileUpload={handleFileUploadMockFn}/>)
        fireEvent.change(screen.getByTestId('fileInput'))
        expect(handleFileUploadMockFn).toHaveBeenCalled()       
    })
