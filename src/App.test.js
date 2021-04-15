import App from './App';
import React from "react";
import {fireEvent, render, screen, waitFor, cleanup} from "@testing-library/react";

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
afterEach(cleanup);
describe('App', () => {
    test('Full flow test', async () => {
        // Render all component
        render(<App/>);

        //Check display home title
        const homeTitle = screen.queryByText("Image list");
        expect(homeTitle).toBeInTheDocument();


        //Wait for image API call
        await waitFor(async () => {
            const imageItems = await screen.findAllByTestId("image-item");
            //Check display images
            imageItems.forEach(item => {
                expect(item).toBeInTheDocument()
            })
        }, {timeout: 3000});

        //Check display See more button
        const seeMore = screen.queryByTestId("see-more");
        expect(seeMore).toHaveTextContent("See more");

        //find all image tag
        const imageItems = await screen.findAllByTestId("image-item");
        //Query button see more
        const btnSeeMore = screen.queryByTestId("see-more");
        //Simulate See more click
        fireEvent.click(btnSeeMore);
        //Wait for image API call
        await waitFor(async () => {
            const afterClickItems = await screen.findAllByTestId("image-item");
            //Check display images
            expect(afterClickItems.length).toBe(imageItems.length + 3)
        }, {timeout: 3000});

        //Simulate click on image item
        const images = await screen.findAllByTestId("image");
        expect(images).toBeTruthy();
        fireEvent.click(images[0]);

        //Check display Detail screen
        const detailTitle = screen.queryByTestId("detail-title");
        expect(detailTitle).toBeInTheDocument();
        expect(detailTitle).toHaveTextContent("Detail");

        //Check image info
        const numberRegex = new RegExp('^[0-9]+$');

        //Check ID
        const imageId = screen.queryByTestId("image-id");
        expect(imageId).toBeInTheDocument();
        expect(imageId.innerHTML.toString()).toMatch(numberRegex);

        //Check Width
        const imageWidth = screen.queryByTestId("image-width");
        expect(imageWidth).toBeInTheDocument();
        expect(imageWidth.innerHTML.toString()).toMatch(numberRegex);

        //Check Height
        const imageHeight = screen.queryByTestId("image-height");
        expect(imageHeight).toBeInTheDocument();
        expect(imageWidth.innerHTML.toString()).toMatch(numberRegex);


        //Check Image URL
        const imageUrl = screen.queryByTestId("image-url");
        expect(imageUrl).toBeInTheDocument();
        const urlRegex = new RegExp("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
        expect(imageUrl.innerHTML.toString()).toMatch(urlRegex);

        //Check Image photographer
        const imagePhotographer = screen.queryByTestId("image-photographer");
        expect(imagePhotographer).toBeInTheDocument();

        //Check Image photographer URL
        const imagePhotographerUrl = screen.queryByTestId("image-photographer_url");
        expect(imagePhotographerUrl).toBeInTheDocument();

        //Check Image photographer ID
        const imagePhotographerId = screen.queryByTestId("image-photographer_id");
        expect(imagePhotographerId).toBeInTheDocument();

        //Check Image Avg color
        const hexColorCodeRegex = new RegExp("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");
        const imageAvgColor = screen.queryByTestId("image-avg_color");
        expect(imageAvgColor).toBeInTheDocument();
        expect(imageAvgColor.innerHTML.toString()).toMatch(hexColorCodeRegex);

        //Check Image liked
        const imageLiked = screen.queryByTestId("image-liked");
        expect(imageLiked).toBeInTheDocument();
        expect(imageLiked).toHaveTextContent('false')

        //Simulate image click
        const displayImage = screen.queryByTestId("display-image");
        fireEvent.click(displayImage);
        //Check function call
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
