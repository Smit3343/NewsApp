import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'

export class App extends Component {
  render() {
    return (
      <div >
      <Navbar/>
      <div className='container'>
      <News pagesize={18} country="in" category="sports" />
      </div>
      </div>
    )
  }
}

export default App