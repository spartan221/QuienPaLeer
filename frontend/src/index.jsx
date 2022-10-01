import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home'
import Register from './components/Register'
import FormBook from './components/publicationBook/ViewBooks';
import Events from './components/ViewEvents'
import "bootstrap/dist/js/bootstrap.js";
import 'jquery/dist/jquery.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'buyBooks',
        element: <FormBook />
      },
      {
        path: 'events',
        element: <Events />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)