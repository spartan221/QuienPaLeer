import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FormBook from './components/AddBookSale.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <FormBook/>
    </div>
  )
}

export default App
