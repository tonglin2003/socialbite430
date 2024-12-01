import { useActionData, redirect, useParams, Link } from "react-router-dom";

export async function action({ params }) {
  try {
    const response = await fetch(
      `/api/restaurant_post/delete/${params.postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      console.log(response);
    //   redirect("/restaurant/1");
    return null;
    }
    const { errors } = await response.json();
    return errors;
  } catch (error) {
    console.error(error);
    console.log("AN ERROR!");
    return "Whoops! Something went wrong";
  }

  //   code
}

function DeletePost() {
  const errors = useActionData();
  const { postId } = useParams();

  return (
    <>
      <h1 className="text-2xl pt-3 ml-2">Delete Restaurant Post</h1>
      <Link to={`/restaurant_post/${postId}`} className="ml-2">
        {"<"} Back
      </Link>
      {errors && <div className="text-red-300">{errors}</div>}
    </>
  );
}

export default DeletePost;
