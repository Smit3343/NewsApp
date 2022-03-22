import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
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
    constructor(){
        super()
        this.state={
            articals:[],
            isLoading:false,
            page:1
        }
    }
    async componentDidMount(){
        let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=1&pagesize=${this.props.pagesize}`;
        this.setState({isLoading:true})
        let data=await fetch(apiUrl);
        let parsedData=await data.json();
        this.setState({
            articals:parsedData.articles
            ,isLoading:false,
            totalResults:parsedData.totalResults
        })
        console.log(parsedData)
    }
    previousBtnClick=async()=>{
        let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
        this.setState({isLoading:true})
        let data=await fetch(apiUrl);
        let parsedData=await data.json();
        this.setState({
            articals:parsedData.articles,
            isLoading:false,
            page:this.state.page-1
        })
    }
    nextBtnClick=async()=>{
        if(this.state.page+1<=Math.ceil(this.state.totalResults/this.props.pagesize))
        {
            let apiUrl=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
            this.setState({isLoading:true})
        
            let data=await fetch(apiUrl);
        let parsedData=await data.json();
        console.log(parsedData)
        this.setState({
            articals:parsedData.articles,
            isLoading:false,
            page:this.state.page+1
        })

        }
        
    }
    render() {
        console.log("render");
        return (
            <>
            <div className='my-2'>
                <h3 className='text-center'>NewMonkey - top Headlines</h3>
                {this.state.isLoading && <Spinner/>}

                <div className="row">
                    {!this.state.isLoading && this.state.articals.map((element)=>{
                        return <div key={element.url} className="col-md-4">
                        <NewsItem  title={element.title!=null?element.title.slice(0,45):""} imgUrl={element.urlToImage!=null?element.urlToImage:"https://amp.dev/static/img/sharing/docs-guide-600x314.png"} newsUrl={element.url} description={element.description!=null?element.description.slice(0,91):""} />
                    </div>
                    })}
                </div>
            </div>
            <div className='d-flex justify-content-between my-5'>
            <button type="button" disabled={this.state.page<=1} onClick={this.previousBtnClick}  className="btn btn-primary">&larr;previous</button>
            <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.nextBtnClick} className="btn btn-primary">next&rarr;</button>
            </div>
            </>
        )
    }
}

export default News