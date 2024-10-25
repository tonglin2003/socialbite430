import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NavBar from "./Component/Navbar/NavBar";
import Home from "./Home/Home";
import Login from "./UserAuthentication/Login";
import Signup from "./UserAuthentication/Signup";
import AuthProvider from "./Contexts/AuthContext";


// ----- home page components ----- ///
import RestaurantDisplay from "./Home/HomePageSubSection/RestaurantDisplay";
import RestaurantEventDisplay from "./Home/HomePageSubSection/RestaurantEventDisplay";
import PostModal from "./Component/ModalWindow/ModalWindow"; 
import {
  mainSectionRestaurantLoader,
} from "./Loader/loadRestaurants";
import {
  allEventsLoader
} from "./Loader/loadRestaurantPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <RestaurantDisplay />,
            loader: mainSectionRestaurantLoader,
          },
          {
            path: "/explore",
            element: <RestaurantEventDisplay />,
            loader: allEventsLoader,
            children:
            [
              {
                path: "/explore/:postId",
                element: <PostModal/>
              }
            ]
          },
        ],
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);