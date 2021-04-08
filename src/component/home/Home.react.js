import React from 'react';
import {useHistory} from "react-router-dom";
import './Home.react.css';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 3,
            query: "nature",
            apiKey: '563492ad6f9170000100000179a991b0d3c642ad9e30ab7930fb9c21',
            items: [],
        }
    }

    getNextData() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });
        const requestOpt = {
            // method: 'POST',
            headers: {
                Authorization: this.state.apiKey
            },
            // body: JSON.stringify({title: 'React POST Request Example'})
        };
        fetch("https://api.pexels.com/v1/search?" +
            "page=" + this.state.currentPage +
            "&query=" + this.state.query +
            "&per_page=" + this.state.perPage, requestOpt)
            .then(res => res.json())
            .then(res => {
                console.log(res);
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
                console.log(err)
            })
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.getNextData();
    }

    render() {
        return (
            <div className="container">
                <ListImage items={this.state.items}/>
                <SeeMore onClick={()=>{this.getNextData()}}/>
            </div>
        )
    }
}

function SeeMore(props) {
    return (<div className="text-center">
        <button className="btn btn-primary m-5" onClick={() => {
            props.onClick()
        }}>See more
        </button>
    </div>)
}

function ListImage(props) {
    const history = useHistory();

    function viewDetail(item) {
        console.log(item)
        history.push("/detail", {
            data: item
        })
    }

    const items = props.items.map((item) =>
        <div id="item" key={item.id}>
            <div className="row p-1">
                <div className="col-md-2" onClick={() => {
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
        <div>
            <div>
                <h1 className="text-primary">Image list</h1>
            </div>
            {items}
        </div>
    )
}
