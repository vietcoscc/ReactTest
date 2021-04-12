import App from './App';
import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
// import {fetchImages} from "./api/images";
// jest.mock("./api/images");

test('first display test', async () => {
    render(<App/>);
    const seeMore = screen.queryByTestId("see-more");
    const homeTitle = screen.queryByText("Image list");
    await waitFor(async () => {
        const imageItems = await screen.findAllByTestId("image-item");
        expect(imageItems).toBeTruthy();
        imageItems.forEach(item => {
            expect(item).toBeInTheDocument()
        })
    }, {timeout: 3000});
    expect(homeTitle).toBeInTheDocument();
    expect(seeMore).toHaveTextContent("See more");
});

describe('see more', () => {
    it('see more click', async () => {
        render(<App/>);
        await waitFor(async () => {
            const imageItems = await screen.findAllByTestId("image-item");
            expect(imageItems).toBeTruthy();
            imageItems.forEach(item => {
                expect(item).toBeInTheDocument()
            })
        }, {timeout: 3000});
        const imageItems = await screen.findAllByTestId("image-item");
        console.log(imageItems.length);
        const btnSeeMore = screen.queryByTestId("see-more");
        fireEvent.click(btnSeeMore)
        await waitFor(async () => {
            const afterClickItems = await screen.findAllByTestId("image-item");
            expect(afterClickItems.length).toBe(imageItems.length + 3)
        }, {timeout: 3000});
    })
});
