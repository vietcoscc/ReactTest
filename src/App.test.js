import App from './App';
import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

const oldWindowLocation = window.location;
beforeAll(() => {
    delete window.location;

    window.location = Object.defineProperties(
        {},
        {
            ...Object.getOwnPropertyDescriptors(oldWindowLocation),
            assign: {
                configurable: true,
                value: jest.fn(),
            },
        },
    )
});
beforeEach(() => {
    window.location.assign.mockReset()
});
afterAll(() => {
    // restore `window.location` to the `jsdom` `Location` object
    window.location = oldWindowLocation
});
describe('App', () => {
    test('Full flow test', async () => {
        // Render all component
        render(<App/>);

        //query title tag
        const homeTitle = screen.queryByText("Image list");
        expect(homeTitle).toBeInTheDocument();


        //Wait for API call to display item
        await waitFor(async () => {
            //find all image tag
            const imageItems = await screen.findAllByTestId("image-item");
            imageItems.forEach(item => {
                expect(item).toBeInTheDocument()
            })
        }, {timeout: 3000});

        //query item see more
        const seeMore = screen.queryByTestId("see-more");
        expect(seeMore).toHaveTextContent("See more");

        //find all image tag
        const imageItems = await screen.findAllByTestId("image-item");
        //Query button see more
        const btnSeeMore = screen.queryByTestId("see-more");
        //Emulate see more click
        fireEvent.click(btnSeeMore);
        await waitFor(async () => {

            const afterClickItems = await screen.findAllByTestId("image-item");
            expect(afterClickItems.length).toBe(imageItems.length + 3)
        }, {timeout: 3000});

        //Emulate click on image item
        const images = await screen.findAllByTestId("image");
        expect(images).toBeTruthy();
        fireEvent.click(images[0]);

        //Detail
        const detailTitle = screen.queryByTestId("detail-title");
        expect(detailTitle).toBeInTheDocument();
        expect(detailTitle).toHaveTextContent("Detail");

        const numberRegex = new RegExp('^[0-9]+$');

        const imageId = screen.queryByTestId("image-id");
        expect(imageId).toBeInTheDocument();
        expect(imageId.innerHTML.toString()).toMatch(numberRegex);

        const imageWidth = screen.queryByTestId("image-width");
        expect(imageWidth).toBeInTheDocument();
        expect(imageWidth.innerHTML.toString()).toMatch(numberRegex);

        const imageHeight = screen.queryByTestId("image-height");
        expect(imageHeight).toBeInTheDocument();
        expect(imageWidth.innerHTML.toString()).toMatch(numberRegex);

        const imageUrl = screen.queryByTestId("image-url");
        expect(imageUrl).toBeInTheDocument();
        const urlRegex = new RegExp("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
        expect(imageUrl.innerHTML.toString()).toMatch(urlRegex);

        const imagePhotographer = screen.queryByTestId("image-photographer");
        expect(imagePhotographer).toBeInTheDocument();

        const imagePhotographerUrl = screen.queryByTestId("image-photographer_url");
        expect(imagePhotographerUrl).toBeInTheDocument();

        const imagePhotographerId = screen.queryByTestId("image-photographer_id");
        expect(imagePhotographerId).toBeInTheDocument();

        const hexColorCodeRegex = new RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");
        const imageAvgColor = screen.queryByTestId("image-avg_color");
        expect(imageAvgColor).toBeInTheDocument();
        expect(imageAvgColor.innerHTML.toString()).toMatch(hexColorCodeRegex);

        const imageLiked = screen.queryByTestId("image-liked");
        expect(imageLiked).toBeInTheDocument();
        expect(imageLiked).toHaveTextContent('false')

        const displayImage = screen.queryByTestId("display-image");
        console.log(displayImage);
        fireEvent.click(displayImage);
        expect(window.location.assign).toBeCalledTimes(1);
    });

    test('See more test', async () => {
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
        fireEvent.click(btnSeeMore);
        await waitFor(async () => {
            const afterClickItems = await screen.findAllByTestId("image-item");
            expect(afterClickItems.length).toBe(imageItems.length + 3)
        }, {timeout: 3000});
    })
});
