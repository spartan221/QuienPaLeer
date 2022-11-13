import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles/ContentStyle.css';
import Login from './components/registerLogin/Login'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from './components/SpinnerCircular';



function App() {

  const baseURL = 'http://127.0.0.1:5000/api/profile/myInfo';
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(null);
  const navigate = useNavigate();

  // Verifica si el usuario tiene el cookie activo y funcionando
  // Si el cookie sigue funcionando se redirige de una vez al home
  // caso contrario, despliega la vista del login.
  const isUserAlreadyLogged = () => {
    axios.get(baseURL, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          navigate('/home', { replace: true });
        }
      })
      .catch((error) => {
        setAlreadyLoggedIn(false);
      })
  }

  useEffect(() => {
    isUserAlreadyLogged();
  }, []);


  if (alreadyLoggedIn === false) {
    return (
      <div>
        <Login />
      </div>
    )
  }
  else if (alreadyLoggedIn === null) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <Spinner />
      </div>
    )
  }

}

export default App;
