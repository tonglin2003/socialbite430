import {
  Link,
  Outlet,
  useLoaderData,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./RestaurantSettings.css";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete, AiFillSetting, AiFillEdit } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { MdStorefront } from "react-icons/md";

export async function restaurantSettingsLoader({ params }) {
  const restaurantResponse = await fetch(`/api/restaurant/${params.id}`);
  const restaurant = await restaurantResponse.json();
  // console.log(restaurant);
  return { restaurant };
}

export default function RestaurantSettings() {
  const { restaurant } = useLoaderData();
  return (
    <div className="body">
      <div className="container">
        <div className="leftbox">
          <nav className="nav">
            <Link
              to={`/restaurant/${restaurant.id}/settings/all`}
              className="tab"
            >
              <MdStorefront className="fa-user" />
            </Link>
            <Link
              to={`/restaurant/${restaurant.id}/settings/edit`}
              className="tab"
            >
              <AiFillEdit className="fa-credit" />
            </Link>
            <Link
              to={`/restaurant/${restaurant.id}/settings/delete`}
              className="tab"
            >
              <AiFillDelete className="fa-cog" />
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
