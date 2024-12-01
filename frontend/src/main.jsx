import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NavBar from "./Component/Navbar/NavBar";
import Home from "./Home/Home";
import Login from "./UserAuthentication/Login";
import Signup from "./UserAuthentication/Signup";
import AuthProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./UserAuthentication/ProtectedRoute";
import ShareLocationRequired from "./UserAuthentication/ShareLocationRequired";


// ----- home page components ----- ///
import RestaurantDisplay from "./Home/HomePageSubSection/RestaurantDisplay";
import RestaurantEventDisplay from "./Home/HomePageSubSection/RestaurantEventDisplay";
import {
  nearbyRestaurantLoader,
  mainSectionRestaurantLoader,
} from "./Loader/loadRestaurants";
import {
  allEventsLoader,
  nearbyEventLoader,
  interestedEventLoader,
} from "./Loader/loadRestaurantPosts";

// ------ Search Page components ------ //
import SearchPage from "./Search/SearchPage";
import { searchRestaurantLoader } from "./Loader/loadRestaurants";

// Restaurant Setting
import RestaurantSettings, {
  restaurantSettingsLoader,
} from "./RestaurantSettings/RestaurantSettings";

// Allow user to edit restaurant
import EditRestaurant, {
  editRestaurantAction,
} from "./RestaurantSettings/EditRestaurant/EditRestaurant";

// Restaurant page
import RestaurantPage from "./RestaurantPage/RestaurantPage";



import DeleteRestaurant, {
  deleteAction,
} from "./RestaurantSettings/DeleteRestaurant/DeleteRestaurant";
import RestaurantPost, {
  postLoader,
} from "./RestaurantPage/RestaurantPosts/RestaurantPost";
import AddPost, {
  action as addPostAction,
  // loader as addPostLoader,
} from "./RestaurantPage/RestaurantPosts/AddPost";
import DeletePost, {
  action as deletePostAction,
} from "./RestaurantPage/RestaurantPosts/DeletePost";
import AddReview, {
  action as addReviewAction,
} from "./RestaurantPage/RestaurantReviews/AddReview";
import AllRestaurants, {
  allRestaurantsLoader,
} from "./RestaurantSettings/AllRestaurants/AllRestaurants";

// modal window for post
import PostModal from "./Component/ModalWindow/ModalWindow";

// user page
import User, { userSettingsLoader } from "./UserSettings/User";
import Account, { editUserAction } from "./UserSettings/Account/Account";
import Delete, { deleteUserAction } from "./UserSettings/Delete/delete";
import RestaurantReviews, {
  reviewsLoader,
} from "./RestaurantPage/RestaurantReviews/RestaurantReviews";


// map container
// import MapContainer from "./RestaurantPage/RestaurantMap/RestaurantMap";

import { restaurantByIdLoader } from "./Loader/loadRestaurants";


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
            path: "/nearby_restaurants",
            element: (
              <ShareLocationRequired>
                <RestaurantDisplay />
              </ShareLocationRequired>
            ),
            loader: nearbyRestaurantLoader,
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
          {
            path: "/nearby_restaurant_post",
            element: <RestaurantEventDisplay />,
            loader: nearbyEventLoader,
          },
          {
            path: "/interested_restaurant_post",
            element: (
              <ProtectedRoute>
                <RestaurantEventDisplay />
              </ProtectedRoute>
            ),
            loader: interestedEventLoader,
          },
        ],
      },
      {
        path: "/search/:keywordTerm",
        element: <SearchPage />,
        loader: searchRestaurantLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/user/:id/settings",
        element: <User />,
        loader: userSettingsLoader,
        children: [
          {
            path: "/user/:id/settings/account",
            element: <Account />,
            action: editUserAction,
          },
          {
            path: "/user/:id/settings/delete",
            element: <Delete />,
            action: deleteUserAction,
          },
        ],
      },
      {
        path: "/restaurant/:id/settings",
        element: <RestaurantSettings />,
        loader: restaurantSettingsLoader,
        children: [
          {
            path: "/restaurant/:id/settings/all",
            element: <AllRestaurants />,
            loader: allRestaurantsLoader,
          },
          {
            path: "/restaurant/:id/settings/edit",
            element: <EditRestaurant />,
            action: editRestaurantAction,
          },

          {
            path: "/restaurant/:id/settings/delete",
            element: <DeleteRestaurant />,
            action: deleteAction,
          },
        ],
      },
      {
        path: "/restaurant/:restaurantId",
        loader: postLoader,
        element: <RestaurantPage />,
        children: [
          {
            path: "/restaurant/:restaurantId",
            loader: postLoader,
            element: <RestaurantPost />,
          },
          {
            path: "/restaurant/:restaurantId/review",
            loader: reviewsLoader,
            element: <RestaurantReviews />,
          },
          {
            path: "/restaurant/:restaurantId/review/new",
            element: (
              <ProtectedRoute>
                <AddReview />
              </ProtectedRoute>
            ),
            action: addReviewAction,
          },
        ],
      },
      {
        path: "/restaurant/:restaurantId/post/new",
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
        action: addPostAction,
      },
      {
        path: "restaurant_post/delete/:postId",
        element: (
          <ProtectedRoute>
            <DeletePost />
          </ProtectedRoute>
        ),
        action: deletePostAction,
      },
      {
        path: "/restaurant/reviews",
        loader: reviewsLoader,
        element: <RestaurantReviews />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
