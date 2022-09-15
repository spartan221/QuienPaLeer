import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CreateEvent from './components/createEvent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CreateEvent />
    </div>
  )
}

export default App
