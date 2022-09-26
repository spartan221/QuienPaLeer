import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import FormBook from './components/publicationBook/ViewBooks';
import Navigation from './components/Navigation';
import SideBar from './components/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/ContentStyle.css';
import Events from './components/ViewEvents'
function App() {
  return (
    <div>
      <div className='layout'>
        <div className='navegBar'>
          <Navigation />
        </div>
        <div className="side">
          <SideBar />
        </div>
        <div className="content">
          <Router >
            <Routes >
              <Route path="/books" element={<FormBook />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </Router>
        </div>

        <div className="chat">

        </div>

      </div>
    </div>
  )
}

export default App;
