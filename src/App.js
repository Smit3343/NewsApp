import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';
export class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  pagesize=this.pagesize;
  country='in';
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <div >
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <BrowserRouter>
        <Navbar />
        
          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={this.setProgress} pagesize={this.pagesize} country={this.country} category="general" />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="business" pagesize={this.pagesize} country={this.country} category="business" />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="entertainment" pagesize={this.pagesize} country={this.country} category="entertainment" />} />
            <Route exact path='/general' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="general" pagesize={this.pagesize} country={this.country} category="general" />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="health" pagesize={this.pagesize} country={this.country} category="health" />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="science" pagesize={this.pagesize} country={this.country} category="science" />} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="sports" pagesize={this.pagesize} country={this.country} category="sports" />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} setProgress={this.setProgress} key="technology" pagesize={this.pagesize} country={this.country} category="technology" />} />        
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App