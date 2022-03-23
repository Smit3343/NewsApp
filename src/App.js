import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  pagesize=this.pagesize;
  country='in';
  render() {
    return (
      <div >
        <BrowserRouter>
        <Navbar />

          <Routes>
            <Route exact path='/' element={<News pagesize={this.pagesize} country={this.country} category="general" />} />
            <Route exact path='/business' element={<News key="business" pagesize={this.pagesize} country={this.country} category="business" />} />
            <Route exact path='/entertainment' element={<News key="entertainment" pagesize={this.pagesize} country={this.country} category="entertainment" />} />
            <Route exact path='/general' element={<News key="general" pagesize={this.pagesize} country={this.country} category="general" />} />
            <Route exact path='/health' element={<News key="health" pagesize={this.pagesize} country={this.country} category="health" />} />
            <Route exact path='/science' element={<News key="science" pagesize={this.pagesize} country={this.country} category="science" />} />
            <Route exact path='/sports' element={<News key="sports" pagesize={this.pagesize} country={this.country} category="sports" />} />
            <Route exact path='/technology' element={<News key="technology" pagesize={this.pagesize} country={this.country} category="technology" />} />        
            </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App