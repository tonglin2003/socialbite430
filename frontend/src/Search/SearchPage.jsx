import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { searchRestaurantLoader } from "../Loader/loadRestaurants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneStar } from 'react-icons/ai';


export default function SearchPage(){
    const params = useParams();
    const [data, setData] = useState([]);

    // fetch for search loader with the keyword 
    useEffect(() => {
        const fetchData = async () => {
            const searchRestaurants = await searchRestaurantLoader(params.keywordTerm);
            setData(searchRestaurants);
        };
    
        fetchData();
      }, [params.keywordTerm]);

      const style = {
        // Define your styles here, for example:
        fontSize: '24px',
        color: 'gold',
      };

    return(
        <>
      <div className="restaurant-cards">
        {
            (data.length !== 0)? 
            
            // when restaurants are returned from the db
            (data.map((restaurant, index) => (
                <Link to={`/`} className="card" key={index}>
                    <img
                    className="cardImage"
                    src={restaurant.profileImage}
                    alt={"Img"}
                    />
                    <div className="cardName flex justify-center m-3">
                    {restaurant.restaurantName}
                    </div>
                    <div className="cardType">{restaurant.foodType}</div>
                    <div className="rateAndButton">
                    <span className="cardRate">
                        <AiTwotoneStar style={style} />
                        {restaurant.rate}
                    </span>
                    <button className="go-to-page">Go To Page</button>
                    </div>
                </Link>
        ))) :
        (// When no restaurant is found in the db
        <div className="flex h-screen items-center justify-center ml-20">
            <div className="flex flex-col items-center">
                <div className="font-extrabold text-5xl font-mono">
                    Didn't find restaurants...
                </div>
            </div>
        </div>
        )
        }
      </div>
    </>
    )
}