
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ContentStyle.css';
import Login from './registerLogin/Login'
function App() {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default App;
