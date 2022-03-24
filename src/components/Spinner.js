import React from 'react'
import loading from '../spinner.gif'

export default function Spinner() {
  return (
    <div className='text-center'>
        <img src={loading} className="my-3" alt="loading"/>
    </div>
  )
}
