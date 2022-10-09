import { useState } from "react"
import axios from 'axios'
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Navigation from './Navigation';
import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ContentStyle.css';

const Home = () => {

    const baseURL = 'http://127.0.0.1:5000/api/auth/myInfo'
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
        fetchUserName()
    })

    return (
        <div>
            <div className='layout'>
                <div className='navegBar'>
                    <Navigation userName={userName} />
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
