import { Form } from "react-router-dom";
import "./HomeStyle.css";
import Slider from "../Component/Slider/Slider";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import React, { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("main");

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleMouseEnter = () => {
    const element = document.getElementById("restaurant_subNav");
    element.classList.remove("hidden");
  };

  const handleMouseLeave = () => {
    const element = document.getElementById("restaurant_subNav");
    element.classList.add("hidden");
  };

  const handleMouseEnterPost = () => {
    const element = document.getElementById("restaurant_post_subNav");
    element.classList.remove("hidden");
  };

  const handleMouseLeavePost = () => {
    const element = document.getElementById("restaurant_post_subNav");
    element.classList.add("hidden");
  };

  const handleLocationNotShare = () =>{
    alert("Please share your location to see nearby restaurants and their events");
  }

  return (
    <div className="home-page">
      <Slider />

      <>
        <div className="flex">
          <div
            id="restaurant-sub-nav"
            className={`relative homeTab flex justify-center ${activeTab === "main" ? "active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row">
              Restaurant
              <svg width="25px" height="35px" className="pl-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>

              <div id="restaurant_subNav" className="sub-nav hidden absolute top-full left-0 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700 dark:divide-gray-600 ">
                <div className="flex flex-col px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100">
                  <Link to="/" onClick={() => { handleTabClick("main"); }} className="flex flex-row">
                    <svg fill="#000000" width="35px" height="23px" className="pr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 44.999 44.999" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M42.558,23.378l2.406-10.92c0.18-0.816-0.336-1.624-1.152-1.803c-0.816-0.182-1.623,0.335-1.802,1.151l-2.145,9.733 h-9.647c-0.835,0-1.512,0.677-1.512,1.513c0,0.836,0.677,1.513,1.512,1.513h0.573l-3.258,7.713 c-0.325,0.771,0.034,1.657,0.805,1.982c0.19,0.081,0.392,0.12,0.588,0.12c0.59,0,1.15-0.348,1.394-0.925l2.974-7.038l4.717,0.001 l2.971,7.037c0.327,0.77,1.215,1.127,1.982,0.805c0.77-0.325,1.13-1.212,0.805-1.982l-3.257-7.713h0.573 C41.791,24.564,42.403,24.072,42.558,23.378z"></path> <path d="M14.208,24.564h0.573c0.835,0,1.512-0.677,1.512-1.513c0-0.836-0.677-1.513-1.512-1.513H5.134L2.99,11.806 C2.809,10.99,2,10.472,1.188,10.655c-0.815,0.179-1.332,0.987-1.152,1.803l2.406,10.92c0.153,0.693,0.767,1.187,1.477,1.187h0.573 L1.234,32.28c-0.325,0.77,0.035,1.655,0.805,1.98c0.768,0.324,1.656-0.036,1.982-0.805l2.971-7.037l4.717-0.001l2.972,7.038 c0.244,0.577,0.804,0.925,1.394,0.925c0.196,0,0.396-0.039,0.588-0.12c0.77-0.325,1.13-1.212,0.805-1.98L14.208,24.564z"></path> <path d="M24.862,31.353h-0.852V18.308h8.13c0.835,0,1.513-0.677,1.513-1.512s-0.678-1.513-1.513-1.513H12.856 c-0.835,0-1.513,0.678-1.513,1.513c0,0.834,0.678,1.512,1.513,1.512h8.13v13.045h-0.852c-0.835,0-1.512,0.679-1.512,1.514 s0.677,1.513,1.512,1.513h4.728c0.837,0,1.514-0.678,1.514-1.513S25.699,31.353,24.862,31.353z"></path> </g> </g> </g></svg>
                    All Restaurant
                  </Link>
                </div>
              </div>
          </div>

          <div
            id="restaurant-post-sub-nav"
            className={`relative homeTab flex justify-center ${activeTab === "post" ? "active" : ""}`}
            onMouseEnter={handleMouseEnterPost}
            onMouseLeave={handleMouseLeavePost}
          >
            <div className="flex flex-row">
              Restaurant Event
              <svg width="25px" height="35px" className="pl-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

            </div>

            
              <div id="restaurant_post_subNav" className="sub-nav hidden absolute top-full left-0 mt-1 z-5 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-60">
                <div className="flex flex-col px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100">
                  <Link to="/explore" onClick={() => { handleTabClick("post"); }} className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="23px" className="pr-2" viewBox="0 0 24 24" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M0 0h24v24H0z" fill="none"></path><path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"></path></g></svg>
                    All Restaurant Events
                  </Link>
                </div>
                <div className="flex flex-col px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100">
                  <Link to="/interested_restaurant_post" onClick={() => { handleTabClick("post"); }} className="flex flex-row">
                    <svg width="35px" height="23px" className="pr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2V4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 20V22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M2 12L4 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 12L22 12" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M6 18L6.34305 17.657" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M17.6567 6.34326L18 6" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 18L17.657 17.657" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M6.34326 6.34326L6 6" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M10.7847 15.3538L10.3157 15.9391L10.7847 15.3538ZM7.25 11.3796C7.25 11.7938 7.58579 12.1296 8 12.1296C8.41421 12.1296 8.75 11.7938 8.75 11.3796H7.25ZM12 9.90096L11.4554 10.4166C11.597 10.5662 11.794 10.651 12 10.651C12.206 10.651 12.403 10.5662 12.5446 10.4166L12 9.90096ZM13.2153 15.3538L13.6843 15.9391L13.2153 15.3538ZM10.2909 14.0016C9.97317 13.7358 9.50016 13.7779 9.23437 14.0956C8.96858 14.4133 9.01065 14.8863 9.32835 15.1521L10.2909 14.0016ZM8.75 11.3796C8.75 10.6647 9.14671 10.0958 9.64107 9.86605C10.0847 9.65992 10.7461 9.66744 11.4554 10.4166L12.5446 9.3853C11.454 8.23345 10.1154 7.99162 9.00898 8.50573C7.95333 8.99626 7.25 10.1171 7.25 11.3796H8.75ZM10.3157 15.9391C10.5164 16.0999 10.7605 16.2953 11.0151 16.4465C11.269 16.5974 11.6065 16.75 12 16.75V15.25C11.9935 15.25 11.931 15.2459 11.7811 15.1569C11.6318 15.0682 11.4683 14.9406 11.2537 14.7686L10.3157 15.9391ZM13.6843 15.9391C14.2286 15.5029 15.0074 14.9422 15.6138 14.248C16.2459 13.5245 16.75 12.5983 16.75 11.3796H15.25C15.25 12.1383 14.9502 12.7276 14.4842 13.2611C13.9925 13.8239 13.379 14.2616 12.7463 14.7686L13.6843 15.9391ZM16.75 11.3796C16.75 10.1171 16.0467 8.99626 14.991 8.50573C13.8846 7.99162 12.546 8.23345 11.4554 9.3853L12.5446 10.4166C13.2539 9.66744 13.9153 9.65992 14.3589 9.86605C14.8533 10.0958 15.25 10.6647 15.25 11.3796H16.75ZM12.7463 14.7686C12.5317 14.9406 12.3682 15.0682 12.2189 15.1569C12.069 15.2459 12.0065 15.25 12 15.25V16.75C12.3935 16.75 12.731 16.5974 12.9849 16.4465C13.2395 16.2953 13.4836 16.0999 13.6843 15.9391L12.7463 14.7686ZM11.2537 14.7686C10.9194 14.5007 10.6163 14.2739 10.2909 14.0016L9.32835 15.1521C9.66331 15.4323 10.0345 15.7138 10.3157 15.9391L11.2537 14.7686Z" fill="#1C274C"></path> </g></svg>
                    Interested Events
                  </Link>
                </div>
              </div>
          </div>
        </div>

        <Outlet />
      </>
    </div>
  );
}


