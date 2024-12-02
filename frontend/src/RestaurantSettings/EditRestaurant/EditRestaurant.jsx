import { redirect } from "react-router-dom/dist/umd/react-router-dom.development";
import "./EditRestaurant.css";

import { Form } from "react-router-dom";
export default function EditRestaurant() {
  return (
    <div className="edit-restaurant">
      <Form className="profileEdit" method="patch">
        <h1 className="title">Edit Restaurant</h1>
        <h2 className="sub-title">Restaurant Name</h2>
        <input
          name="restaurantName"
          className="input"
          type="text"
          placeholder="Lord of the Fries"
        />
        <h2 className="sub-title">Restaurant Address</h2>
        <input
          name="address"
          className="input"
          type="text"
          placeholder="1234 Laughter Lane, Giggle City, SMILE 56789"
        />

        <button type="submit" className="btnEdit">
          Update
        </button>
      </Form>
    </div>
  );
}

// export async function editRestaurantAction({ request, params }) {
//   console.log("adfasd");
//   let formData = await request.formData();
//   let jobData = Object.fromEntries(formData);
//   const response = await fetch("/api/restaurant/editRestaurant/3", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(jobData),
//   });
//   return redirect("/restaurant/settings");
// }

// export async function editRestaurantAction({ request, params }) {
//   console.log(request);
//   let editData = await request.formData();
//   let justData = Object.fromEntries(editData);

//   const response = await fetch(`/api/restaurant/${params.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(justData),
//   });
//   return redirect("/");
// }

export async function editRestaurantAction({ request, params }) {
  console.log("adfasd");
  let formData = await request.formData();
  let jobData = Object.fromEntries(formData);
  console.log(jobData);
  // jobData.restaurantName;
  // jobData.address;
  const response = await fetch(`/api/restaurant/editRestaurant/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return redirect("/");
}
