async function fetchImages(page, query, per_page) {
    const requestOpt = {
        // method: 'POST',
        // body: JSON.stringify({title: 'React POST Request Example'}),
        headers: {
            Authorization: '563492ad6f9170000100000179a991b0d3c642ad9e30ab7930fb9c21'
        },
    };
    const url = "https://api.pexels.com/v1/search?" +
        "page=" + page +
        "&query=" + query +
        "&per_page=" + per_page;
    return await fetch(url, requestOpt)
}

export {fetchImages}
