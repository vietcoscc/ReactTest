import React from 'react';
import './Detail.react.css'

export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.location.state.data
        }
    }


    render() {
        function viewOriginal(url) {
            window.location.assign(url);
        }

        return (
            <div className="container">
                <div className="text-center">
                    <h1 data-testid="detail-title" className="text-primary">Detail</h1>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <img data-testid="display-image" className="img-thumbnail" src={this.state.data.src.medium} onClick={() => {
                            viewOriginal(this.state.data.src.original)
                        }}/>
                    </div>
                    <div className="col-md-8">
                        <DetailContent data={this.state.data}/>
                    </div>
                </div>
            </div>
        )
    }
}


function DetailContent(props) {
    return (<div>
        <table className="table-responsive-md">
            <tbody>
            <tr>
                <td>ID</td>
                <td data-testid="image-id">{props.data.id}</td>
            </tr>
            <tr>
                <td>Width</td>
                <td data-testid="image-width">{props.data.width}</td>
            </tr>
            <tr>
                <td>Height</td>
                <td data-testid="image-height">{props.data.height}</td>
            </tr>
            <tr>
                <td>URL</td>
                <td data-testid="image-url">{props.data.url}</td>
            </tr>
            <tr>
                <td>Photographer</td>
                <td data-testid="image-photographer">{props.data.photographer}</td>
            </tr>
            <tr>
                <td>Photographer url</td>
                <td data-testid="image-photographer_url">{props.data.photographer_url}</td>
            </tr>
            <tr>
                <td>Photographer ID</td>
                <td data-testid="image-photographer_id">{props.data.photographer_id}</td>
            </tr>
            <tr>
                <td>Avg color</td>
                <td data-testid="image-avg_color">{props.data.avg_color}</td>
            </tr>
            <tr>
                <td>Liked</td>
                <td data-testid="image-liked">{props.data.liked.toString()}</td>
            </tr>
            </tbody>
        </table>
    </div>)
}
