import { Form } from "react-router-dom";
import "./HomeStyle.css";
import Slider from "../Component/Slider/Slider";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("main");
  const url = useLocation();
  const lastUrlItem = url.pathname.split("/").pop(); // to get the last part of the url, e.g. http://something/lastPartOfURL
  const {location} = useContext(AuthContext); // to tell if the user shared their location or not

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  let hideTimeout; // To store the timeout reference

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout); // Cancel the hide timeout if it exists
    const element = document.getElementById("restaurant_subNav");
    element.classList.remove("hidden");
  };
  
  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      const element = document.getElementById("restaurant_subNav");
      element.classList.add("hidden");
    }, 200);
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
                <div className="flex flex-col px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-100">
                  <Link to={(location)?"/nearby_restaurants" : lastUrlItem} onClick={() => { (location)? handleTabClick("main") : handleLocationNotShare()}} className="flex flex-row">
                  <svg width="35px" height="23px" className="pr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 639.65 639.65" xmlSpace="preserve" fill="#000000" stroke="#000000" strokeWidth="0.00639653">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <g>
                            <path style={{ fill: "#010002" }} d="M319.865,0C208.534,0,118.317,90.227,118.317,201.5c0,111.302,201.549,438.153,201.549,438.153S521.336,312.792,521.336,201.5C521.336,90.227,431.138,0,319.865,0z M319.865,357.422c-86.017,0-155.942-69.906-155.942-155.903c0-85.968,69.925-155.922,155.942-155.922c85.929,0,155.863,69.964,155.863,155.922C475.729,287.516,405.794,357.422,319.865,357.422z M439.716,163.767c-1.084-3.263-3.889-5.657-7.308-6.136l-72.211-10.503l-32.3-65.411c-1.495-3.107-4.651-5.032-8.08-5.032c-3.429,0-6.585,1.925-8.099,5.032l-32.3,65.411l-72.202,10.503c-3.41,0.479-6.233,2.872-7.269,6.136c-1.075,3.244-0.195,6.849,2.257,9.243l52.27,50.942l-12.34,71.928c-0.576,3.371,0.83,6.78,3.576,8.813c1.583,1.163,3.449,1.729,5.325,1.729c1.426,0,2.882-0.342,4.211-1.036l64.571-33.951l64.591,33.951c1.329,0.694,2.765,1.036,4.191,1.036c1.856,0,3.713-0.567,5.305-1.729c2.784-2.032,4.162-5.442,3.576-8.813l-12.33-71.928L437.4,173.01C439.882,170.616,440.771,167.011,439.716,163.767z M375.506,220.796l13.112,76.588l-68.782-36.14l-68.782,36.14l13.131-76.588l-55.661-54.244l76.911-11.187l34.401-69.681l34.401,69.681l76.901,11.187L375.506,220.796z"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                    Nearby Restaurant
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
                  <Link to={(location)?"/nearby_restaurant_post" : lastUrlItem} onClick={() => { (location)? handleTabClick("post") : handleLocationNotShare(); }} className="flex flex-row">
                    <svg width="35px" height="23px" className="pr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4Z" stroke="#1C274C" strokeWidth="1.5"></path> <path d="M6.04779 10.849L6.28497 10.1375H6.28497L6.04779 10.849ZM8.22309 11.5741L7.98592 12.2856H7.98592L8.22309 11.5741ZM9.01682 13.256L8.31681 12.9868H8.31681L9.01682 13.256ZM7.77003 16.4977L8.47004 16.7669H8.47004L7.77003 16.4977ZM17.9522 10.849L17.715 10.1375H17.715L17.9522 10.849ZM15.7769 11.5741L16.0141 12.2856H16.0141L15.7769 11.5741ZM14.9832 13.256L15.6832 12.9868L14.9832 13.256ZM16.23 16.4977L15.53 16.7669L16.23 16.4977ZM10.4242 17.7574L11.0754 18.1295L10.4242 17.7574ZM12 14.9997L12.6512 14.6276C12.5177 14.394 12.2691 14.2497 12 14.2497C11.7309 14.2497 11.4823 14.394 11.3488 14.6276L12 14.9997ZM17.1465 7.8969L16.9894 7.16355L17.1465 7.8969ZM15.249 8.30353L15.4061 9.03688V9.03688L15.249 8.30353ZM8.75102 8.30353L8.90817 7.57018V7.57018L8.75102 8.30353ZM6.85345 7.89691L6.69631 8.63026L6.85345 7.89691ZM13.5758 17.7574L12.9246 18.1295V18.1295L13.5758 17.7574ZM15.0384 8.34826L14.8865 7.61381L14.8865 7.61381L15.0384 8.34826ZM8.96161 8.34826L8.80969 9.08272L8.80969 9.08272L8.96161 8.34826ZM15.2837 11.7666L15.6777 12.4048L15.2837 11.7666ZM14.8182 12.753L15.5613 12.6514V12.6514L14.8182 12.753ZM8.71625 11.7666L8.3223 12.4048H8.3223L8.71625 11.7666ZM9.18177 12.753L9.92485 12.8546V12.8546L9.18177 12.753ZM10.3454 9.32206C10.7573 9.36558 11.1265 9.06692 11.17 8.655C11.2135 8.24308 10.9149 7.87388 10.503 7.83036L10.3454 9.32206ZM13.497 7.83036C13.0851 7.87388 12.7865 8.24308 12.83 8.655C12.8735 9.06692 13.2427 9.36558 13.6546 9.32206L13.497 7.83036ZM5.81062 11.5605L7.98592 12.2856L8.46026 10.8626L6.28497 10.1375L5.81062 11.5605ZM8.31681 12.9868L7.07002 16.2284L8.47004 16.7669L9.71683 13.5252L8.31681 12.9868ZM17.715 10.1375L15.5397 10.8626L16.0141 12.2856L18.1894 11.5605L17.715 10.1375ZM14.2832 13.5252L15.53 16.7669L16.93 16.2284L15.6832 12.9868L14.2832 13.5252ZM11.0754 18.1295L12.6512 15.3718L11.3488 14.6276L9.77299 17.3853L11.0754 18.1295ZM16.9894 7.16355L15.0918 7.57017L15.4061 9.03688L17.3037 8.63026L16.9894 7.16355ZM8.90817 7.57018L7.0106 7.16355L6.69631 8.63026L8.59387 9.03688L8.90817 7.57018ZM11.3488 15.3718L12.9246 18.1295L14.227 17.3853L12.6512 14.6276L11.3488 15.3718ZM15.0918 7.57017C14.9853 7.593 14.9356 7.60366 14.8865 7.61381L15.1903 9.08272C15.2458 9.07123 15.3016 9.05928 15.4061 9.03688L15.0918 7.57017ZM8.59387 9.03688C8.6984 9.05928 8.75416 9.07123 8.80969 9.08272L9.11353 7.61381C9.06443 7.60366 9.01468 7.593 8.90817 7.57018L8.59387 9.03688ZM9.14506 19.2497C9.94287 19.2497 10.6795 18.8222 11.0754 18.1295L9.77299 17.3853C9.64422 17.6107 9.40459 17.7497 9.14506 17.7497V19.2497ZM15.53 16.7669C15.7122 17.2406 15.3625 17.7497 14.8549 17.7497V19.2497C16.4152 19.2497 17.4901 17.6846 16.93 16.2284L15.53 16.7669ZM15.5397 10.8626C15.3178 10.9366 15.0816 11.01 14.8898 11.1283L15.6777 12.4048C15.6688 12.4102 15.6763 12.4037 15.7342 12.3818C15.795 12.3588 15.877 12.3313 16.0141 12.2856L15.5397 10.8626ZM15.6832 12.9868C15.6313 12.8519 15.6004 12.7711 15.5795 12.7095C15.5596 12.651 15.5599 12.6411 15.5613 12.6514L14.0751 12.8546C14.1057 13.0779 14.1992 13.3069 14.2832 13.5252L15.6832 12.9868ZM14.8898 11.1283C14.3007 11.492 13.9814 12.1687 14.0751 12.8546L15.5613 12.6514C15.5479 12.5534 15.5935 12.4567 15.6777 12.4048L14.8898 11.1283ZM18.25 9.39526C18.25 9.73202 18.0345 10.031 17.715 10.1375L18.1894 11.5605C19.1214 11.2499 19.75 10.3777 19.75 9.39526H18.25ZM7.07002 16.2284C6.50994 17.6846 7.58484 19.2497 9.14506 19.2497V17.7497C8.63751 17.7497 8.28784 17.2406 8.47004 16.7669L7.07002 16.2284ZM7.98592 12.2856C8.12301 12.3313 8.20501 12.3588 8.26583 12.3818C8.32371 12.4037 8.33115 12.4102 8.3223 12.4048L9.1102 11.1283C8.91842 11.01 8.68219 10.9366 8.46026 10.8626L7.98592 12.2856ZM9.71683 13.5252C9.80081 13.3069 9.89432 13.0779 9.92485 12.8546L8.43868 12.6514C8.44009 12.6411 8.4404 12.6509 8.42051 12.7095C8.3996 12.7711 8.36869 12.8519 8.31681 12.9868L9.71683 13.5252ZM8.3223 12.4048C8.40646 12.4567 8.45208 12.5534 8.43868 12.6514L9.92485 12.8546C10.0186 12.1687 9.69929 11.492 9.1102 11.1283L8.3223 12.4048ZM4.25 9.39526C4.25 10.3777 4.87863 11.2499 5.81062 11.5605L6.28497 10.1375C5.96549 10.031 5.75 9.73202 5.75 9.39526H4.25ZM5.75 9.39526C5.75 8.89717 6.20927 8.52589 6.69631 8.63026L7.0106 7.16355C5.58979 6.8591 4.25 7.9422 4.25 9.39526H5.75ZM12.9246 18.1295C13.3205 18.8222 14.0571 19.2497 14.8549 19.2497V17.7497C14.5954 17.7497 14.3558 17.6107 14.227 17.3853L12.9246 18.1295ZM19.75 9.39526C19.75 7.9422 18.4102 6.85909 16.9894 7.16355L17.3037 8.63026C17.7907 8.52589 18.25 8.89717 18.25 9.39526H19.75ZM10.503 7.83036C10.0374 7.78118 9.57371 7.709 9.11353 7.61381L8.80969 9.08272C9.31831 9.18792 9.83084 9.2677 10.3454 9.32206L10.503 7.83036ZM14.8865 7.61381C14.4263 7.709 13.9626 7.78118 13.497 7.83036L13.6546 9.32206C14.1692 9.2677 14.6817 9.18792 15.1903 9.08272L14.8865 7.61381Z" fill="#1C274C"></path> <path d="M19.4537 15C21.0372 15.7961 22 16.8475 22 18C22 18.7484 21.594 19.4541 20.8758 20.0749M4.54631 15C2.96285 15.7961 2 16.8475 2 18C2 20.4853 6.47715 22.5 12 22.5C13.8214 22.5 15.5291 22.2809 17 21.898" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                    Nearby Events
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




