/* eslint-disable no-unused-vars */
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import "./RestaurantPost.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useFetcher } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PostComment from "../../Component/ModalWindow/CommentButton/CommentButton";
import LikePost from "./LikePost";
import SinglePost from "./SinglePost";

export default function RestaurantPost() {
  const { restaurantId } = useParams();
  // take restaurantId as a param for loader
  const posts = useLoaderData(restaurantId);
  const navigate = useNavigate();
  const [isCorrectUser, setIsCorrectUser] = useState(false);
  const [res, setCurrentRes] = useState([]);
  const [current, setCurrentUser] = useState([]);
  const [likesCount, setLikesCount] = useState(null);

  const userId = current?.user?.id || "1";

  //delete post
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const fetcher = useFetcher();

  async function getRestaurant(id) {
    const response = await fetch(`/api/restaurant/${id}`);
    const restaurant = await response.json();
    setCurrentRes(restaurant);
    return restaurant;
  }

  async function getLoggedUser() {
    const response = await fetch(`/api/auth/current_user`);
    const user = await response.json();
    setCurrentUser(user);
    return user;
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    async function fetchData() {
      const loggedUser = await getLoggedUser();
      const resId = await getRestaurant(restaurantId);
      loggedUser.user.id === resId.UserId
        ? setIsCorrectUser(true)
        : setIsCorrectUser(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4xl p-5 activity">Board</h1>
      <div className="flex justify-between">
        <div></div>
        <div className="mr-2 mb-4">
          {isCorrectUser ? (
            <Link
              to={`/restaurant/${restaurantId}/post/new`}
              className="bg-red-500 rounded text-white px-4 py-2 hover:bg-red-600 hover:text-white transition "
            >
              + Add Post
            </Link>
          ) : null}
        </div>
      </div>
      <div className="w-3/4">
        {posts.length <= 0 || !Array.isArray(posts) ? (
          <div className="no-posts-message">
            <p>No posts available. Check back later!</p>
          </div>
        ) : (
          posts.map((post) => (
            <SinglePost
              key={post?.id}
              post={post}
              isCorrectUser={isCorrectUser}
            />
          ))
        )}
      </div>
    </>
  );
}

export const postLoader = async (restaurantId) => {
  const res = await fetch(
    `/api/restaurant_post/${restaurantId.params.restaurantId}`
  );
  return res.json();
};
