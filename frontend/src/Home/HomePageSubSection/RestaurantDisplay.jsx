import React, { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useLoaderData, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import "../HomeStyle.css";

const RestaurantDisplay = () => {
  const data = useLoaderData();

  if(!Array.isArray(data)) {
    return <>No restaurants were found</>
  }
  const style = {
    // Define your styles here, for example:
    fontSize: '24px',
    color: 'gold',
  };

  const location = useLocation()
  const urlLastItem = location.pathname.split('/').pop();

  return (
    <>
      <div className="restaurant-cards">
      {
        data.map((restaurant, index) => {
          return (
            <Link to={`/restaurant/${restaurant.id}`} className="card" key={index}>
              <img className="cardImage" src={(urlLastItem==="nearby_restaurants")? restaurant.hero_image : restaurant.heroImage} alt={"Img"} />
              <div className="cardName flex justify-center m-3">{(urlLastItem==="nearby_restaurants")? restaurant.restaurant_name : restaurant.restaurantName}</div>
              <div className="cardType">{restaurant.foodType}</div>
              <div className="rateAndButton">
                <span className="cardRate">
                  <AiFillStar style={style} />
                  {restaurant.rate}
                </span>
                <button className="go-to-page">Go To Page</button>
              </div>
            </Link>
          );
        })
      }
      </div>
    </>
  );
};
export default RestaurantDisplay;

