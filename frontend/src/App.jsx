import { useState } from 'react'
import './App.css'

import ViewBooks from './components/publicationBook/ViewBooks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <ViewBooks/>
    </div>
  )
}

export default App
