import { useEffect, useState } from "react";

function UsersRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const apiRes = await fetch("/api/restaurant/follows", {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await apiRes.json();
        if (res?.followedRestaurants?.length > 0) {
          setRestaurants(res?.followedRestaurants);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRestaurants();
  }, []);
 
  return (
    <div className="w-4/5 mx-auto mt-5">
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-semibold text-nowrap">
          Followed Restaurants
        </h2>
        <div className="h-[2px] bg-gray-200 w-full"></div>
      </div>
      <div className="my-5">
        {restaurants?.length === 0 ? (
          <div className="w-full h-[450px] grid place-content-center bg-white rounded-3xl shadow-lg border">
            <p className="text-gray-400 text-center">No restaurant found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {restaurants?.map((res, i) => (
              <div
                key={i}
                className="h-[400px] w-full bg-white rounded-3xl shadow-xl border overflow-hidden"
              >
                <img
                  src={res?.Restaurant?.heroImage}
                  alt=""
                  className="h-[60%] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">
                    {res?.Restaurant?.restaurantName}
                  </h2>
                  <h2 className="flex items-center font-medium gap-1">
                    Rating: {res?.Restaurant?.rate}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersRestaurant;
