import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Spinner from "./SpinnerCircular"

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
        }, 3000);
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
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <Spinner/>
            </div>
        );
    }




}

export default Home;