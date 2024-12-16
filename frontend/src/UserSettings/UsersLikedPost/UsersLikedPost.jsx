import { useEffect, useState } from "react";
import SinglePost from "../../RestaurantPage/RestaurantPosts/SinglePost";

function UsersLikedPost() {
  const [posts, setPosts] = useState([]);
  const [isCorrectUser, setIsCorrectUser] = useState(false);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const apiRes = await fetch("/api/restaurant_post/likes", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await apiRes.json();

        if (res?.likedPosts?.length > 0) {
          setPosts(res?.likedPosts);
          setIsCorrectUser(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRestaurants();
  }, []);

  console.log(posts);
  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-semibold text-nowrap">Liked Posts</h2>
        <div className="h-[2px] bg-gray-200 w-full"></div>
      </div>
      <div className="my-5">
        {posts?.length === 0 ? (
          <div className="w-full h-[450px] grid place-content-center bg-white rounded-3xl shadow-lg border">
            <p className="text-gray-400 text-center">No restaurant found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {posts?.map((res, i) => (
              <div key={i} className="border">
                <SinglePost post={res?.Post} isCorrectUser={isCorrectUser} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersLikedPost;
