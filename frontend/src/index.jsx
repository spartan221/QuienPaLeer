import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Register from "./components/registerLogin/Register";
import FormBook, {
  loader as booksLoader
} from "./components/publicationBook/ViewBooks";
import Events, {
  loader as eventsLoader,
} from "./components/publicationEvent/ViewEvents";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.js";
import Profile, {
  loader as profileLoader,
} from './components/profile/Profile.jsx';

import ViewDonations, {
  loader as donationsLoader
} from "./components/publicationDonation/ViewDonations";
import Swaps, {
  loader as swapsLoader
} from './components/publicationSwap/ViewSwaps';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
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
      }, {
        path: 'events/profile/:userId',
        element: <Profile myProfile={false} />,
        loader: profileLoader
      },
      {
        path: 'buyBooks/profile/:userId',
        element: <Profile myProfile={false} />,
        loader: profileLoader
      },
      {
        path: 'profile/:userId',
        element: <Profile myProfile={true} />,
        loader: profileLoader
      },
      {
        path: 'donationBooks',
        element: <ViewDonations />
      },
      {
        path: 'donationBooks/profile/:userId',
        element: <Profile myProfile={false} />,
        loader: profileLoader
      },
      {
        path: 'ChangeBooks',
        element: <Swaps />
      },
      {
        path: 'ChangeBooks/profile/:userId',
        element: <Profile myProfile={false} />,
        loader: profileLoader
      },
      {
        path: 'events/search/:filter',
        element: <Events />,
        loader: eventsLoader
      },
      {
        path: 'buyBooks/search/:filter',
        element: <FormBook />,
        loader: booksLoader
      },
      {
        path: 'donationBooks/search/:filter',
        element: <ViewDonations />,
        loader: donationsLoader
      },
      {
        path: 'changeBooks/search/:filter',
        element: <Swaps />,
        loader: swapsLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)