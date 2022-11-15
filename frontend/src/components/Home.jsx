import { useState } from "react"
import { useRef } from "react";
import axios from 'axios'
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';
import { io } from "socket.io-client";

const Home = () => {

    const baseURL = 'http://127.0.0.1:5000/api/profile/myInfo'
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const socket = useRef();


    const fetchUser = () => {
        axios.get(baseURL, { withCredentials: true })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                navigate('/', { replace: true })
            })
    }

    useEffect(() => {
        fetchUser();
        socket.current = io("ws://127.0.0.1:8900");
    }, [])

    return (
        <div>
            <div className='layout'>
                <div className='navegBar'>
                    <Navigation {...user}/>
                </div>
                <div className="side">
                    <SideBar/>
                </div>
                <div className="content">
                    <Outlet context={{ userContext: [user, setUser], socket}}/>
                </div>

                <div className="chat">

                </div>

            </div>
        </div>
    );





}

export default Home;