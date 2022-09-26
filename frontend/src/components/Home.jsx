import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBook from "./publicationBook/ViewBooks";
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';
import Events from './ViewEvents'
const Home = () => {

    const baseURL = 'http://localhost:5000/api/auth/myInfo'
    const [userName, setuserName] = useState(null)
    const navigate = useNavigate();


    const fetchUserName = () => {
        axios.get(baseURL, { withCredentials: true })
            .then((response) => {
                setuserName(response.data.name + ' ' + response.data.lastName)
            })
            .catch((error) => {
                navigate('/', { replace: true })
            })
    }

    useEffect(() => {
        setTimeout(() => {
            fetchUserName()
        }, 60000);
    })


    if (userName) {
        return (
            <div>
                <h1>Este es el Home</h1>
                <h2>{`Hola! ${userName}`}</h2>
            </div>
        );
    } else {
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
                
                  <Routes >
                    <Route path="/home/books" element={<FormBook />} />
                    <Route path="/home/events" element={<Events />} />
                  </Routes>
              </div>
      
              <div className="chat">
      
              </div>
      
            </div>
          </div>
        );
    }




}

export default Home;
