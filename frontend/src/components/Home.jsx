import { useState } from "react"
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

const Home = () => {

    const baseURL = ApiHeroku + 'api/profile/myInfo'
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();

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
                <SideBar {...user} />
                <div className="content w-100">
                    <Navigation {...user} />
                    {location.pathname === "/home" ? <Content /> : <Outlet />}
                </div>
            </div>
        </div>
    );





}

export default Home;