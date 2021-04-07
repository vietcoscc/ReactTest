import React from 'react';
import {useHistory} from "react-router-dom";
import './Home.react.css';

const imageItem = {
    id: 2014422,
    width: 3024,
    height: 3024,
    url: "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
    photographer: "Joey Farina",
    photographer_url: "https://www.pexels.com/@joey",
    photographer_id: 680589,
    avg_color: "#978E82",
    src: {
        original: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
        large2x: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        large: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        medium: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
        small: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
        portrait: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        landscape: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        tiny: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
    }
};
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            apiKey: '563492ad6f9170000100000130526a041228439587b2d8847c4dc1bb',
            items: [imageItem, imageItem, imageItem],
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <ListImage items={this.state.items}/>
            </div>
        )
    }
}

function ListImage(props) {
    const history = useHistory();

    function viewDetail() {
        history.push("/detail", {})
    }

    const items = props.items.map((item) =>
        <div id="item">
            <div className="row p-1">
                <div className="col-md-2" onClick={viewDetail}>
                    <a>
                        <img className="w-100 h-100" src={item.src.tiny} alt={"image"}/>
                    </a>
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
            <h1>Image list</h1>
            {items}
        </div>
    )
}
