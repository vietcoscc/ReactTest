import React from 'react';
import {useHistory} from "react-router-dom";
import './Home.react.css';
import {fetchImages} from "./../../api/images";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 3,
            query: "nature",
            items: [],
        }
    }

    async getNextData() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
         await fetchImages(this.state.currentPage, 'nature', 3)
            .then(res => res.json())
            .then(res => {
                const images = {
                    page: res.page,
                    per_page: res.per_page,
                    photos: res.photos,
                    total_results: res.total_results,
                    next_page: res.next_page
                };
                this.setState({
                    items: this.state.items.concat(images.photos.map(function (item) {
                        item.key = new Date();
                        return item
                    }))
                })
            })
            .catch(err => {
                console.log("Error: " + err)
            });
    }

    componentDidMount() {
        this.getNextData();
    }

    render() {
        return (
            <div className="container" data-testid="container">
                <ListImage items={this.state.items}/>
                <SeeMore onClick={() => {
                    this.getNextData()
                }}/>
            </div>
        )
    }
}

function SeeMore(props) {
    return (
        <div className="text-center">
            <button data-testid="see-more" className="btn btn-primary m-5" onClick={() => {
                props.onClick()
            }}>See more
            </button>
        </div>
    )
}

function ListImage(props) {
    const history = useHistory();

    function viewDetail(item) {
        history.push("/detail", {
            data: item
        })
    }

    const items = props.items.map((item, index) =>
        <div id="item" key={index} data-testid="image-item">
            <div className="row p-1">
                <div data-testid="image" className="col-md-2" onClick={() => {
                    viewDetail(item)
                }}>
                    <img className="img-thumbnail" src={item.src.tiny} alt={"image"}/>
                </div>
                <div className="col-md-6">
                    <div>
                        <a href={item.url}>{item.url}</a>
                    </div>
                    <span>Photographer: {item.photographer}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div data-testid="list-image">
            <div>
                <h1 className="text-primary">Image list</h1>
            </div>
            {items}
        </div>
    )
}
