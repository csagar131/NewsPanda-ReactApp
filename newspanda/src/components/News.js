import React, { Component } from 'react'
import Spinner from './Spinner'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'; // ES6
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'

export default class News extends Component {


    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super()
        this.state = {
            articles: [
                {
                    title: "",
                    description: "",
                    imgToUrl: "img",
                    url: "",
                    totalResults: 0
                },

            ],
            loading: true,
            progress : 20,
            page: 1
        }
    }

    UpdatePage = async () => {
        this.setState(
            {
                loading: true,
                progress : 50,
            }
        )
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page= ${this.state.page}&pageSize=${this.props.pageSize}`)
        this.setState({
            progress : 80
        })
        let parsedData = await data.json()
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
                progress : 100,
            }
        )
    }

    async componentDidMount() {
        this.UpdatePage()
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
            progress : 50
            
        })
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page= ${this.state.page}&pageSize=${this.props.pageSize}`)
        let parsedData = await data.json()
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                progress : 100,
            }
        )

    };

    finishProgress = () => {
        this.setState({
            progress : 0
        })
    }


    render() {
        return (

            <>
                <LoadingBar
                    color='#f11946'
                    height={2}
                    progress={this.state.progress}
                    onLoaderFinished={() => this.finishProgress()}
                />
                <div style={{margin : "75px"}}>
                    <h2 className="text-center">NewsPanda - Top Headlines</h2>
                </div>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >   <div className="container">
                        <div className="row my-10">
                            {this.state.articles.map((element) =>
                            (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} url={element.url} date={element.publishedAt} author={element.author} source={element.source ? element.source.name : "unknown"} />
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}