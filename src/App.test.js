import App from './App';
import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'

const fakeImages = [{
    "width": 3024,
    "height": 3024,
    "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
    "photographer": "Joey Farina",
    "photographer_url": "https://www.pexels.com/@joey",
    "photographer_id": 680589,
    "avg_color": "#978E82",
    "src": {
        "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
    },
    "liked": false
}, {
    "width": 3024,
    "height": 3024,
    "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
    "photographer": "Joey Farina",
    "photographer_url": "https://www.pexels.com/@joey",
    "photographer_id": 680589,
    "avg_color": "#978E82",
    "src": {
        "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
    },
    "liked": false
}, {
    "width": 3024,
    "height": 3024,
    "url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
    "photographer": "Joey Farina",
    "photographer_url": "https://www.pexels.com/@joey",
    "photographer_id": 680589,
    "avg_color": "#978E82",
    "src": {
        "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
        "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
        "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
    },
    "liked": false
}];
const fakeRes = {
    page: 1,
    per_page: 3,
    photos: fakeImages,
    total_results: 1111111,
    next_page: 2,
};

const server = setupServer(

);

const oldWindowLocation = window.location;

beforeAll(() => {
    server.listen();

    //
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
    window.location.assign.mockReset();
});


afterEach(() => server.resetHandlers());

afterAll(() => {
    // restore `window.location` to the `jsdom` `Location` object
    window.location = oldWindowLocation
    server.close()
});

describe('App test', () => {
    it('Full flow test', async () => {
        server.use(rest.get("https://api.pexels.com/v1/search", (req, res, ctx) => {
            return res(ctx.json(fakeRes))
        }));
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
    it('View image detail test', function () {

    });
});
