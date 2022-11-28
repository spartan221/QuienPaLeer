import { useState } from "react"
import { useRef } from "react";
import axios from 'axios'
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';
import Content from "./ContentHome";
import '../css/ContentHome.css';
const ApiHeroku = import.meta.env.VITE_API
import Spinner from './SpinnerCircular';
const ApiHeroku=import.meta.env.VITE_API
import { io } from "socket.io-client";

const Home = () => {

    const baseURL = ApiHeroku + 'api/profile/myInfo'
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
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
        setTimeout(() => {
            fetchUser()
        }, 3000);
    })
        fetchUser();
        socket.current = io("https://quienpaleer-socket-server.onrender.com");
    }, [])


    if (!user || !socket.current){
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}>
                <Spinner />
              </div>
        );
    }else{
        return (
        <div>
            <div className='layout'>
                <SideBar {...user} />
                <div className="content w-100">
                    <Navigation {...user} />
                    {location.pathname === "/home" ? <Content /> : <Outlet context={{ userContext: [user, setUser], socket}}/>}
                </div>
            </div>
        );
    }

}

export default Home;