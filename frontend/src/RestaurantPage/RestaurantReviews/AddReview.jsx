import {
    Form,
    Link,
    useActionData,
    redirect,
    useParams,
  } from "react-router-dom";
  
  export async function action({ request, params }) {
    let formData = await request.formData();
    let postData = Object.fromEntries(formData);
    console.log(postData);
    console.log(params.restaurantId)
    try {
      // /api/restaurants/1/posts
      const response = await fetch(
        `/api/review/${params.restaurantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      let url = `/restaurant/${params.restaurantId}`;
      if (response.ok) {
        console.log(response);
        return redirect(url);
      }
      const { errors } = await response.json();
      return errors;
    } catch (error) {
      console.error(error);
      console.log("AN ERROR!");
      return "Whoops! Something went wrong";
    }
  }
  
  function AddReview() {
    const errors = useActionData();
    const { restaurantId } = useParams();
  
    return (
      <Form method="post" className="selection:bg-red-200 flex flex-col gap-2 ">
        <h1 className="text-2xl pt-3 ml-2">Add Restaurant Review</h1>
        
        <Link to={`/restaurant/${restaurantId}`} className="ml-2">
          {"<"} Back
        </Link>
        {errors && <div className="text-red-300">{errors}</div>}
        <div className="flex flex-col items-center justify-center">
          <fieldset className="flex flex-col">
          <label htmlFor="review">Rating Out of 5</label>
          <input
              type="number"
              name="rate"
              id="rate"
              min="1" max="5"
              className="border-4 focus:outline-none p-2"
            />
            <label htmlFor="review">Content</label>
            <input
              type="text"
              name="review"
              id="review"
              className="border-4 focus:outline-none p-2"
            />
          </fieldset>
          <input
            className="bg-red-500 hover:bg-red-600 text-white transition mt-4 p-3 rounded cursor-pointer "
            type="submit"
            value="Post"
          ></input>
        </div>
      </Form>
    );
  }
  
  export default AddReview;
  