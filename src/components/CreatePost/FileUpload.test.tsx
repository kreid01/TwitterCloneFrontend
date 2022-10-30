import React from 'react'
import { FileUpload } from './FileUpload'

import { screen, render, cleanup, fireEvent  } from '@testing-library/react';
import "@testing-library/jest-dom";


const handleFileUploadMockFn = jest.fn()


it('clicking on label calls the handleChange function', () => {
    render(
        <FileUpload
        handleFileUpload={handleFileUploadMockFn}/>)
        fireEvent.click(screen.getByLabelText(""))
        expect(handleFileUploadMockFn).toHaveBeenCalled()       
    })