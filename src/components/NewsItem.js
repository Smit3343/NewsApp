import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, publishedAt, author, source } = this.props;
        return (
            <div>
                <div className="card m-3">
                    <span style={{left:"90%",zIndex:'1'}} class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {source}
                    </span>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem