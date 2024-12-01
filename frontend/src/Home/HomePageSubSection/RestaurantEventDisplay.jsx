import React, { useContext, useState, useEffect  } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development';
// import PostModal from '../../Component/ModalWindow/ModalWindow';
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';

const RestaurantEventDisplay = () => {
  const data = useLoaderData();

  // to organize the data to fit inside the mansory layout
  const columns = [[], [], [], []];
  data.forEach((restaurant, index) => {
    columns[index % 4].push(restaurant);
  });

  // modal window for each post
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 px-24 pb-24 gap-2">
  {columns.map((column, colIndex) => (
        <div key={colIndex} className="grid gap-2">
          {column.map((restaurantPost, index) => (
            <Link
              to={`/explore/${restaurantPost.id}`}
              key={index}
              className="flex flex-col h-full max-w-full rounded-lg"
              onClick={openModal}
            >
              <div className="">
                {restaurantPost.postImg && (
                  <img
                    className="h-auto max-w-full rounded-t-lg"
                    src={restaurantPost.postImg}
                    alt={"Img"}
                  />
                )}
                <div className={`p-4 flex-grow border border-gray-300  ${restaurantPost.postImg? "rounded-b-lg" : "rounded-lg"}`}>
                  <div style={{fontFamily: "Verdana"}}>{restaurantPost.postTitle}</div>
                  <div className='flex flex-row mt-2'>
                    <img src={restaurantPost.Restaurant.profileImage} className='rounded-full w-7 h-7 object-cover mr-1'/>
                    <p className='text-xs my-auto'>
                      {restaurantPost.Restaurant.restaurantName}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  ))}
  <Outlet/>
</div>



  );
};

export default RestaurantEventDisplay;
