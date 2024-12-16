import {
  useLoaderData,
  useParams,
  Link,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./RestaurantReviews.css";
import { FaCameraRetro, FaStar } from "react-icons/fa";
import React, { useState, useEffect, Fragment } from "react";
import { formatDate } from "../../utils/utils";

export default function RestaurantReviews() {
  const reviews = useLoaderData();
  console.log(reviews, "r");

  const [userInfo, setUserInfo] = useState(null);
  const [listReview, setListReview] = useState([]);

  let { id } = useParams();
  async function getReviews(id) {
    const response = await fetch(`/api/review/${id || 1}`);
    const reviews = await response.json();
    console.log(reviews);
    return reviews; // Return the review data
  }

  // -------------------------Section for setting rating stars ---------------

  function getStars(numStars) {
    const num = Math.round(numStars);
    const stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(<FaStar size={30} style={{ color: "orange" }} />);
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
      await getReviews(id); // Fetch the reviews but don't set the state here
      await mapReviews(); // Map over the reviews and set the state with JSX elements
    }
    fetchData();
  }, []);

  async function mapReviews() {
    const data = await getReviews(id);

    const list = await Promise.all(
      reviews.map(async (item, i) => {
        const userInf = await getUser(item.UserId); // Assuming each review has a restaurantId

        return (
          <Fragment key={i}>
            <div className="w-full mt-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  className="p-3 border rounded-lg resize-none focus:outline-none focus:ring-0 focus:ring-white"
                  placeholder="5/5"
                />
              </div>
              <textarea
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-0 focus:ring-white mt-4"
                rows="4"
                placeholder="Write your review here..."
                // value={reviewInput}
                // onChange={(e) => setReviewInput(e.target.value)}
              ></textarea>
              <button
                className="mt-3 px-4 py-2 bg-r-500 ml-auto text-white rounded-md bg-red-500 font-semibold tra hover:bg-red-600"
                // onClick={handlePostReview}
              >
                + Post Review
              </button>
            </div>
            <div className="my-4 flex items-center justify-start gap-4 w-full mr-auto text-3xl font-semibold text-gray-900">
              <h2>Reviews</h2>
              <div className="w-full h-[2px] bg-gray-200"></div>
            </div>
            <div className="bg-white rounded-lg w-full mb-4 p-4 border shadow-md">
              <div className="review-header flex flex-row justify-between items-center">
                <div className="res-detail-box flex flex-row gap-4 items-start">
                  <img
                    className="user-image-small w-16 h-16 rounded-lg object-cover"
                    src={userInf?.profileImage}
                    alt="User profile"
                  />
                  <div className="res-details flex flex-col">
                    <Link
                      to={`/user/${item?.UserId}`}
                      className="text-2xl font-semibold"
                    >
                      {userInf?.username}
                    </Link>
                    <p className="text-gray-400 text-sm">
                      Posted at {formatDate(item?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="rate flex flex-row items-center gap-2">
                  {...getStars(item.rate)}
                  <span className="text-sm text-gray-500">
                    {item.reviewDate}
                  </span>
                </div>
              </div>

              <p className="review-body mt-3 text-gray-800 w-3/4 ml-20">
                {item.review}
              </p>
            </div>
          </Fragment>
        );
      })
    );
    setListReview(list);
  }
  return <Fragment>{1 ? listReview : <p>Loading...</p>}</Fragment>;

  {
    /* <div>
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
          </div> */
  }
}

export const reviewsLoader = async (restaurantId) => {
  console.log(restaurantId.params.restaurantId, "169");
  const res = await fetch(`/api/review/${restaurantId.params.restaurantId}`);

  return res.json();
};
