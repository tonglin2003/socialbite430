import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";
import "./AllRestaurants.css";


export default function AllRestaurants() {
  const allRests = useLoaderData();
  return (
    <div className="add-restaurant">
      <h1 className="review-title">My Restaurants</h1>
      {allRests.map((restaurant) => (
        <>
          <div className="quote-container">
            <div className="quote-text">
              <span id="quote" key={restaurant.UserId}>
                {restaurant.restaurantName}
              </span>
              <p id="author">{restaurant.address}</p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export const allRestaurantsLoader = async ({ params }) => {
  const res = await fetch(`/api/user/my_restaurant`);
  return res.json();
};

// export async function addRestaurantAction({ request, params }) {
//   console.log("adfasd");
//   let formData = await request.formData();
//   let jobData = Object.fromEntries(formData);
//   // jobData.restaurantName;
//   // jobData.address;
//   const response = await fetch("/api/restaurant", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(jobData),
//   });
//   return redirect("/restaurant/settings");
// }

// export const addRestaurantAction = async ({ request }) => {
//   const data = await request.formData();

//   const response = await fetch("http://localhost:4000/api/restaurant", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: {
//       restaurantName: data.get("name"),
//       address: data.get("address"),
//     },
//   });

//   return redirect("/restaurant/settings/");
// };

// export const addRestaurantAction = async ({ request }) => {
//   const data = await request.formData();

//   const submission = {
//     restaurantName: data.get("name"),
//     address: data.get("address"),
//   };

//   return redirect("/restaurant/settings/");
// };
