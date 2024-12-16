import Like from "../../assets/icons/like";

function LikePost({ postId, isLiked = false, setIsLikesSync }) {
  //Handling like and unlike operation
  const handleLike = async (postId) => {
    //based on if post is liked or not, we hit separate urls to like or unlike the post
    const apiURL = isLiked
      ? `/api/restaurant_post/${postId}/unlike`
      : `/api/restaurant_post/${postId}/like`;
    try {
      const apiRes = await fetch(apiURL, {
        method: isLiked ? "DELETE" : "POST", //Changing the method based on isLiked or not
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
      });

      if (apiRes.ok) {
        const resData = await apiRes.json();
        setIsLikesSync(true);
        console.log(resData.message); // Log the success message
      } else {
        const errorData = await apiRes.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  return (
    <div>
      <div
        onClick={() => handleLike(postId)}
        className={`${
          isLiked
            ? "text-red-500 bg-red-100 hover:bg-red-200"
            : "text-gray-800  hover:text-gray-900 bg-gray-200"
        } p-2 rounded-full hover:transition-transform duration-300 cursor-pointer`}
      >
        <Like size={26} />
      </div>
    </div>
  );
}

export default LikePost;
