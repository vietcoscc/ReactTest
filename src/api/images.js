async function fetchImages() {
    const requestOpt = {
        headers: {
            Authorization: this.state.apiKey
        },
    };
    await fetch("https://api.pexels.com/v1/search?" +
        "page=" + "0" +
        "&query=" + "nature" +
        "&per_page=" + "3", requestOpt)
}

export {fetchImages}
