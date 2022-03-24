import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter(category) {
        return category.charAt(0).toUpperCase() + category.substr(1);
    }
    constructor(props) {
        super(props)
        this.state = {
            articals: [],
            isLoading: true,
            page: 1,
            totalResults: 0
        }
        document.title = this.capitalizeFirstLetter(this.props.category) + " - NewsMonkey";
    }

    updateNews = async () => {
        this.props.setProgress(10);
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ isLoading: true })
        let data = await fetch(apiUrl);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articals: parsedData.articles,
            isLoading: false,
            totalResults: parsedData.totalResults
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        let data = await fetch(apiUrl);
        let parsedData = await data.json();
        this.setState({
            articals: this.state.articals.concat(parsedData.articles),
        })
    };
    render() {
        return (
            <>
                    <h3 className='text-center my-4'>NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
                    {this.state.isLoading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articals.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articals.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className='container'>
                        <div className="row">
                            {this.state.articals.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem
                                        title={element.title}
                                        imgUrl={element.urlToImage ? element.urlToImage : "https://amp.dev/static/img/sharing/docs-guide-600x314.png"}
                                        newsUrl={element.url}
                                        description={element.description ? element.description.slice(0, 91) : ""}
                                        publishedAt={element.publishedAt}
                                        author={element.author ? element.author : ""}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                        </div>
                    </InfiniteScroll>
            </>
        )
    }
}

export default News