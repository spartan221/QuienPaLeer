import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CreateEvent from './components/createEvent'
import Register from './components/Register'
import Login from './components/Login'
import ViewEvent from './components/ViewEvent'
import ViewEvents from './components/ViewEvents'
// <CreateEvent />
// <Register />
//<Login />
function App() {
  return (
    <div className="App">
     
      <ViewEvents />
    </div>
  )
}

export default App
