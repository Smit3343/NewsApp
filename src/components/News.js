import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor(){
        super()
        this.state={
            articals:[],
            isLoading:true,
            page:1
        }
    }
    async componentDidMount(){
        let apiUrl="https://newsapi.org/v2/top-headlines?country=in&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=1&pagesize=18";
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
        let apiUrl=`https://newsapi.org/v2/top-headlines?country=in&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=${this.state.page-1}&pagesize=18`;
        let data=await fetch(apiUrl);
        let parsedData=await data.json();
        this.setState({
            articals:parsedData.articles,
            isLoading:false,
            page:this.state.page-1
        })
    }
    nextBtnClick=async()=>{
        if(this.state.page+1<=Math.ceil(this.state.totalResults/18))
        {
            let apiUrl=`https://newsapi.org/v2/top-headlines?country=in&apiKey=1f26e2d3eb2347d492fc076db19aeb26&page=${this.state.page+1}&pagesize=18`;
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
                <div className="row">
                    {this.state.articals.map((element)=>{
                        return <div key={element.url} className="col-md-4">
                        <NewsItem  title={element.title!=null?element.title.slice(0,45):""} imgUrl={element.urlToImage!=null?element.urlToImage:"https://amp.dev/static/img/sharing/docs-guide-600x314.png"} newsUrl={element.url} description={element.description!=null?element.description.slice(0,91):""} />
                    </div>
                    })}
                </div>
            </div>
            <div className='d-flex justify-content-between my-5'>
            <button type="button" disabled={this.state.page<=1} onClick={this.previousBtnClick}  className="btn btn-primary">&larr;previous</button>
            <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/18)} onClick={this.nextBtnClick} className="btn btn-primary">next&rarr;</button>
            </div>
            </>
        )
    }
}

export default News