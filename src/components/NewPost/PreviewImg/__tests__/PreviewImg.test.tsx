import { screen, render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import renderer from 'react-test-renderer'


import { PreviewImg } from '../PreviewImg';

const mockImgUrl = ''

afterEach(cleanup)
it("renders an image when user inputs", () => {
    render(
        <PreviewImg
        imgSrc={mockImgUrl}/>) 
    expect(screen.getByTestId("previewImg")).toBeVisible()
})

it("matched snapshot", () => {
    const tree = renderer.create(<PreviewImg imgSrc={mockImgUrl}/>).toJSON()
    expect(tree).toMatchSnapshot()
})
