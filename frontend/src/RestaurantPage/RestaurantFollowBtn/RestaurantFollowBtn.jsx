import { useEffect, useState } from "react";

function RestaurantFollow({ resId }) {
  const [totalFollowers, setTotalFollowers] = useState(null);
  const [followersSync, setFollowersSync] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  //Get All like count
  useEffect(() => {
    async function fetchFollowCount() {
      const apiRes = await fetch(`/api/restaurant/${resId}/follows/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await apiRes.json();
      setTotalFollowers(res);
      setFollowersSync(false);
    }
    fetchFollowCount();
  }, [followersSync, resId]);

  useEffect(() => {
    if (totalFollowers) {
      if (
        totalFollowers?.followCount > 0 &&
        totalFollowers?.restaurantId === Number(resId)
      ) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    }
  }, [totalFollowers]);
 

  //Handler for follow/unfollow
  const handleFollowUnfollow = async (id) => {
    const apiURL = isFollowed
      ? `/api/restaurant/${id}/unfollow`
      : `/api/restaurant/${id}/follow`;
    try {
      const apiRes = await fetch(apiURL, {
        method: isFollowed ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!apiRes.ok) {
        console.error("Error:", await apiRes.text());
        return;
      }

      const contentType = apiRes.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const resData = await apiRes.json();
        setFollowersSync(true);
        console.log(resData.message);
      } else {
        console.error("Unexpected response format");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-0.5">
      <h3>
        {totalFollowers?.followCount || 0} follower
        {totalFollowers?.followCount > 1 ? "s" : ""}
      </h3>
      <button
        onClick={() => handleFollowUnfollow(resId)}
        className="px-4 py-2 bg-sky-400 hover:bg-sky-500 transition-all ease-in-out duration-300 rounded-md mt-2 text-center text-white mx-auto w-40"
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default RestaurantFollow;
