import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, url, date, author, source } = this.props;

        return (
            <div>
                <div className="card">
                    <span className="position-absolute top-0  translate-middle badge rounded-pill " style={{left : "90%"}}>
                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </span>
                    <img src={imgUrl? imgUrl : ""} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                    </div>

                    <div className="card-footer text-muted">
                        Published At : {date ? new Date(date).toGMTString() : 'No Date'} by "{author ? author : "Unknown"}"
                    </div>
                    <div className="card-body">
                        <a href={url} target="_blank" rel="noreferrer" className="btn-sm btn-primary">Read More</a>
                    </div>

                </div>
            </div>
        )
    }
}