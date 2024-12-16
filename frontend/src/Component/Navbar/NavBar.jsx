"use client";
import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  Outlet,
  Link,
  Form,
  useNavigate,
  useLocation,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./NavBarStyle.css";
import Footer from "../Footer/Footer";
import edit from "../../icons/edit.png";
import settings from "../../icons/edit.png";
import { Avatar, Dropdown } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import Search from "../Search/Search";

export default function NavBar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const urlLastItem = location.pathname.split("/").pop();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
    setTimeout(() => {
      navigate("/login");
      console.log("triggering redirect");
    }, 0);
    console.log(currentUser);
    console.log("logging out!!");
  };

  // if the we are on login or signup, hide the navbar and footer
  if (urlLastItem === "login" || urlLastItem === "signup") {
    return (
      <>
        <Outlet />
      </>
    );
  }

  // for other pages, return the navbar and the footer
  return (
    <>
      <div className="entire-page ">
        <div className="headerBar">
          <Link to="/" className="flex h-full">
            <img
              className="logo"
              src="/src/assets/socialbites-logo.png"
              alt="logo"
            />
          </Link>

          <div className="right ">
            <div className="nav-menu">
              <ul className="nav-menu-list">
                <li className="nav-menu-item z-5">
                  <Search />
                </li>
                <li className="nav-menu-item pt-1">
                  <Link to="/aboutapp">About</Link>
                </li>
                <li className="nav-menu-item pt-1">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="nav-menu-item pt-1">
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            {currentUser ? (
              <Form method="post" onSubmit={handleLogout}>
                <button type="submit" className="logout mr-2">
                  Logout
                </button>
              </Form>
            ) : (
              <Link to="/login" className="login mr-2">
                Log in
              </Link>
            )}

            <Dropdown
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    currentUser
                      ? currentUser.profileImage
                      : "/src/assets/default-avatar.webp"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                {currentUser ? (
                  <div>
                    <div>
                      <Link
                        to={`/user/${currentUser.id}/settings/account`}
                        // to={`/user/${currentUser.id}/settings`}
                        className="gap-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <Avatar
                          alt="User settings"
                          img="/src/assets/default-avatar.webp"
                          rounded
                        />
                      </Link>
                    </div>
                    <span className="block text-sm dark:text-white">
                      {currentUser.username}
                      {/* {currentUser.id} */}
                    </span>
                    <span className="block truncate text-sm font-medium dark:text-white">
                      {currentUser.email}
                    </span>
                    <Link
                      to={`/user/${currentUser.id}`}
                      className="dark:text-white flex flex-row gap-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Profile
                    </Link>
                  </div>
                ) : (
                  <div>
                    <span className="block text-sm">Username</span>
                    <span className="block truncate text-sm font-medium">
                      User@user.com
                    </span>
                    <span className="block text-sm">Profile</span>
                  </div>
                )}
              </Dropdown.Header>

              {currentUser && currentUser.hasRestaurant && (
                <>
                  {currentUser.restaurants.map((restaurant) => (
                    <div className="dropdown-list" key={restaurant.id}>
                      <Link
                        key={restaurant.id}
                        to={`/restaurant/${restaurant.id}`}
                        className="block flex flex-row gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <img src={edit} className="w-5" />
                        {restaurant.restaurantName}
                      </Link>
                      <Link to={`/restaurant/${restaurant.id}/settings`}>
                        <img src={settings} className="w-5" />
                      </Link>
                    </div>
                  ))}
                </>
              )}
              <Dropdown.Divider />
              <Form
                method="post"
                onSubmit={handleLogout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <button type="submit" className="flex flex-row gap-1">
                  {" "}
                  <HiLogout className="mt-1" />
                  Logout
                </button>
              </Form>
            </Dropdown>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
