import { useLoaderData, useParams, Link } from "react-router-dom/dist/umd/react-router-dom.development";
import "./RestaurantReviews.css";
import { FaCameraRetro, FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function RestaurantReviews() {
  const reviews = useLoaderData();
  console.log(reviews);
  

  const [userInfo, setUserInfo] = useState(null);
  const [listReview, setListReview] = useState([]);

  
  let{ id } = useParams();
  async function getReviews(id) {
      
      const response = await fetch(`/api/review/${id}`);
      const reviews = await response.json();
      return reviews; // Return the review data
  }


// -------------------------Section for setting rating stars ---------------

  function getStars(numStars) {
      const num = Math.round(numStars);
      const stars = [];
      for(let i = 1; i <= num; i++) {
          stars.push(<FaStar size={30} style={{color: "orange"}}/>)
      }
      return stars;
  }

// -------------------------Section for getting associated restaurant ---------------

  async function getUser(Id) {
      try {
          const response = await fetch(`/api/user/get_user/${Id}`);
          const restaurant = await response.json();
          console.log(restaurant);
          return restaurant;
      } catch (error) {
          console.error("Error fetching user:", error);
          return null;
      }
  }

  useEffect(() => {
    async function fetchData() {
        await getReviews(id);  // Fetch the reviews but don't set the state here
        await mapReviews();   // Map over the reviews and set the state with JSX elements
    }
    fetchData();
}, []);
  
  async function mapReviews() {

  const data = await getReviews(id);
  
  const list = await Promise.all(reviews.map(async (item, index) => {
      const userInf = await getUser(item.UserId);  // Assuming each review has a restaurantId
      console.log(userInf);
      return (
        <>
          <div className="review-box w-full mb-2">
              <div className="review-header flex flex-row justify-between">
                  <div className="res-detail-box flex flex-row gap-4">
                      <img className="user-image-small w-16 h-16" src={userInf.profileImage}></img>
                      <div className="res-details flex flex-col justify-center text-2xl">
                          <Link to={`/user/${item.UserId}`} className="text-6xl">{userInf.username}</Link>
                      </div>
                  </div>
                  <div className="rate flex flex-row">
                      {...getStars(item.rate)}
                  </div>
              </div>
              <p className="review-body">
                  {item.review}
              </p>
          </div>
          </>
      );
  }));
  setListReview(list);
}
  return <>{ 1 ? listReview : (<p>Loading...</p>)}</>;


          {/* <div>
            <div className="ranking">
              <h1 className="review-ranking">
                Bob`s Burgers{" "}
                <span>
                  {reviews.allReviews.map((review) => (
                    <>
                      <span key={review.id}>{`${review.rate}`}</span>
                    </>
                  ))}
                  /5
                </span>
              </h1>
            </div>
            <h1 className="review-title">Reviews</h1>
            {reviews.allReviews.map((review) => (
              <>
                <div className="quote-container">
                  <div className="quote-text">
                    <FaQuoteLeft className="fas" />
                    <span id="quote" key={review.id}>
                      {review.review}
                    </span>
                    <p id="author">{review.User.username}</p>
                  </div>
                </div>
              </>
            ))}
          </div> */}
    
}

export const reviewsLoader = async (restaurantId) => {
  console.log(restaurantId.params.restaurantId);
  const res = await fetch(`/api/review/${restaurantId.params.restaurantId}`);
  return res.json();
};