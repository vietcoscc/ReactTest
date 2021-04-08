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
            window.location.href = url
        }

        return (
            <div className="container">
                <div className="text-center"><h1 className="text-primary">Detail</h1></div>
                <div className="row">
                    <div className="col-md-4">
                        <img className="img-thumbnail" src={this.state.data.src.medium} onClick={() => {
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
            <tr>
                <td>ID</td>
                <td>{props.data.id}</td>
            </tr>
            <tr>
                <td>Width</td>
                <td>{props.data.width}</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>{props.data.height}</td>
            </tr>
            <tr>
                <td>URL</td>
                <td>{props.data.url}</td>
            </tr>
            <tr>
                <td>Photographer</td>
                <td>{props.data.photographer}</td>
            </tr>
            <tr>
                <td>Photographer url</td>
                <td>{props.data.photographer_url}</td>
            </tr>
            <tr>
                <td>Photographer ID</td>
                <td>{props.data.photographer_id}</td>
            </tr>
            <tr>
                <td>Avg color</td>
                <td>{props.data.avg_color}</td>
            </tr>
            <tr>
                <td>Liked</td>
                <td>{props.data.liked.toString()}</td>
            </tr>
        </table>

    </div>)
}
