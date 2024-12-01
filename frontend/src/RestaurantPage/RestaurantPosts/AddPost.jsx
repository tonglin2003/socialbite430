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
  postData.tags = postData.tags.split(", ");
  console.log(postData.tags);
  
  try {
    // /api/restaurants/1/posts
    const response = await fetch(
      `/api/restaurant_post/${params.restaurantId}`,
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

function AddPost() {
  const errors = useActionData();
  const { restaurantId } = useParams();

  return (
    <Form method="post" className="selection:bg-red-200 flex flex-col gap-2 ">
      <h1 className="text-2xl pt-3 ml-2">Add Restaurant Post</h1>
      <Link to={`/restaurant/${restaurantId}`} className="ml-2">
        {"<"} Back
      </Link>
      {errors && <div className="text-red-300">{errors}</div>}
      <div className="flex flex-col items-center justify-center">
        <fieldset className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="postTitle"
            id="postTitle"
            className="border-4 focus:outline-none p-2"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="postContent">Content</label>
          <input
            type="text"
            name="postContent"
            id="postContent"
            className="border-4 focus:outline-none p-2"
          />
        </fieldset>
        {/* optional to upload an image */}
        <fieldset className="flex flex-col">
          <label htmlFor="postImg">Image</label>
          <input
            type="text"
            name="postImg"
            id="postImg"
            className="border-4 focus:outline-none p-2"
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
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

export default AddPost;
