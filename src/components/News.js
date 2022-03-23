import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    apiKey="77d5b36bf6d240b592c2414b42d80ff1";
    static defaultProps={
        country:'in',
        pagesize:9,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pagesize:PropTypes.number,
        category:PropTypes.string
    }
    capitalizeFirstLetter(category){
        return category.charAt(0).toUpperCase()+category.substr(1);
    }
    constructor(props){
        super(props)
        this.state={
            articals:[],
            isLoading:false,
            page:1
        }
        document.title=this.capitalizeFirstLetter(this.props.category)+" - NewsMonkey";
    }
    
    updateNews= async ()=>{
        let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({isLoading:true})
        let data=await fetch(apiUrl);
        let parsedData=await data.json();
        this.setState({
            articals:parsedData.articles,
            isLoading:false,
            totalResults:parsedData.totalResults
        })
    }
    async componentDidMount(){
        this.updateNews();
    }
    previousBtnClick=async()=>{
        this.setState({
            page:this.state.page-1
        })
        this.updateNews();
    }
    nextBtnClick=async()=>{
        this.setState({
            page:this.state.page+1
        })
        this.updateNews();

    }
    render() {
        return (
            <>
            <div className='container my-2'>
                <h3 className='text-center'>NewMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
                {this.state.isLoading && <Spinner/>}

                <div className="row">
                    {!this.state.isLoading && this.state.articals.map((element)=>{
                        return <div key={element.url} className="col-md-4">
                            <NewsItem
                                title={element.title}
                                imgUrl={element.urlToImage? element.urlToImage : "https://amp.dev/static/img/sharing/docs-guide-600x314.png"}
                                newsUrl={element.url}
                                description={element.description? element.description.slice(0, 91) : ""}
                                publishedAt={element.publishedAt}
                                author={element.author?element.author:""}
                                source={element.source.name} />
                    </div>
                    })}
                </div>
            </div>
            <div className='container d-flex justify-content-between my-5'>
            <button type="button" disabled={this.state.page<=1} onClick={this.previousBtnClick}  className="btn btn-primary">&larr;previous</button>
            <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.nextBtnClick} className="btn btn-primary">next&rarr;</button>
            </div>
            </>
        )
    }
}

export default News