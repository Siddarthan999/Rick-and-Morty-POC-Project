import React, { useState } from 'react'
import GetData from './components/getData'
import './App.css'

function App() {
  //API
  //https://rickandmortyapi.com/api
  //https://rickandmortyapi.com/api/character  
  return (
    <React.Fragment>
      <GetData />
    </React.Fragment>
  )
}
export default App
