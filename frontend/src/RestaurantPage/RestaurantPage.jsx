import "./RestaurantPageStyle.css";
import { GrContact } from "react-icons/gr";
import {
  MdHome,
  MdOutlineRateReview,
  MdOutlineRestaurantMenu,
  MdStarRate,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";
import {
  Outlet,
  useLocation,
  Link,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"; 

export default function RestaurantPage() {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    // function to fetch restaurant by id
    const fetchRestaurantById = async () => {
      try {
        const response = await fetch(`/api/restaurant/${restaurantId}`);
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    // Call the function to fetch the restaurant data
    fetchRestaurantById();
  }, [restaurantId]); // The useEffect hook will re-run whenever the restaurantId changes.

  async function getReviewTotal(id) {
    let counter = 0;
    const response = await fetch(`/api/review/${id}`); //saved
    const reviews = await response.json();
    reviews.map((element) => {
      counter++;
    });
    return counter; // Return the review data
  }

  async function getReviewRatings(id) {
    let total = 0;
    console.log(id, "51");
    const response = await fetch(`/api/review/${id}`); //saved
    const reviews = await response.json();
    reviews.map((element) => {
      total += element.rate;
    });
    return total; // Return the review data
  }

  function getStars(numStars) {
    const num = Math.round(numStars);
    const stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(<FaStar size={30} style={{ color: "orange" }} />);
    }
    return stars;
  }

  function getAverage(counter, total) {
    return Math.floor(total / counter);
  }

  useEffect(() => {
    async function fetchData() {
      let counter = await getReviewTotal(restaurantId); // Fetch the reviews but don't set the state here
      let total = await getReviewRatings(restaurantId);
      setAverage(getAverage(counter, total));
      console.log(average);
    }
    fetchData();
  }, []);
  const location = useLocation();

  return (
    <>
      {restaurant ? (
        <div className="overflow-x-hidden">
          <div className="main-wrap">
            <div className="wrapper1">
              <div className="restaurant-page">
                <img
                  className="res-hero"
                  //src="https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image3-min-1024x569.png"
                  src={restaurant.heroImage}
                ></img>

                <div className="res-content"></div>
              </div>
            </div>
          </div>
          <div className="wrapper flex flex-row w-screen">
            <nav id="sidebar">
              <img
                className="profile-image"
                src={restaurant.profileImage}
              ></img>

              <ul className="list-unstyled components flex flex-col">
                <p className="res-name">{restaurant.restaurantName}</p> 
                <p className="flex flex-row gap-1">
                  Rating: {...getStars(average)}
                </p>

                <li className="flex flex-row items-center justify-start px-5 py-5">
                  <div className="icons">
                    <MdHome size={25} />
                  </div>
                  <Link to={`/restaurant/${restaurantId}`}>Home</Link>
                </li>
                <li className="flex flex-row items-center justify-start px-5 py-5">
                  <div className="icons">
                    <MdOutlineRateReview size={25} />
                  </div>
                  <Link to="review">Reviews</Link>
                </li>
                <li className="flex flex-row items-center justify-start px-5 py-5">
                  <div className="icons">
                    <MdOutlineRestaurantMenu size={25} />
                  </div>
                  <Link to={`/restaurant/${restaurantId}/menu`}>Menu</Link>
                </li>
                <li className="flex flex-row items-center justify-start px-5 py-5">
                  <div className="icons">
                    <GrContact size={25} />
                  </div>
                  <Link to={`/restaurant/${restaurantId}/map`}>Direction</Link>
                </li>
              </ul>
            </nav>
            <div id="contentz">
              {location.pathname === `/restaurant/${restaurantId}/review` ? (
                <Link
                  to={`/restaurant/${restaurantId}/review/new`}
                  className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600 hover:text-white transition mb-3"
                >
                  + Add Review
                </Link>
              ) : null}
              <Outlet />
            </div>
            {location.pathname === `/restaurant/${restaurantId}` ? (
              <div id="suggestion-content">
                <h2 className="text-3xl suggestions">Similar Restaurants</h2>
                {/* <RestaurantCards /> */}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
