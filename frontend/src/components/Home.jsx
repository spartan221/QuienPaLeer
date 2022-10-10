import { useState } from "react"
import axios from 'axios'
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';

const Home = () => {

    const baseURL = 'http://127.0.0.1:5000/api/profile/myInfo'
    const [user, setUser] = useState(null)
    const navigate = useNavigate();


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

    return (
        <div>
            <div className='layout'>
                <div className='navegBar'>
                    <Navigation {...user}/>
                </div>
                <div className="side">
                    <SideBar />
                </div>
                <div className="content">
                    <Outlet />
                </div>

                <div className="chat">

                </div>

            </div>
        </div>
    );





}

export default Home;