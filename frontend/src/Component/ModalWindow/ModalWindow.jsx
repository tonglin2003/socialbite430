import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom/dist/umd/react-router-dom.development';
import PostComment from "../ModalWindow/CommentButton/CommentButton";

const PostModal = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postFetch = await fetch(`/api/restaurant_post/post/${postId}`);
        const postFetchJson = await postFetch.json();
        setPost(postFetchJson);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (post === null) {
    // Return a loading indicator, since post is not yet fetched
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900 z-50 overflow-y-scroll">
        <div
          key={`${post.id}`}
          className="flex flex-col mt-8 my-10 max-h-full overflow-y-auto"
        >
          <div className="post-card post-card-shadow bg-white">
            <div className="post-creator m-5 flex items-center justify-between">

              <Link className='flex flex-row' to={`/restaurant/${post.Restaurant.id}`}>
                <img src={post.Restaurant.profileImage} className='rounded-full w-7 h-7 object-cover mr-1'/>
                <span>{post.Restaurant.restaurantName}</span>
              </Link>
              <button className="ml-2 text-gray-500" onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="line"></div>
            <div>
              <div style={{ width: "36em" }}>
                <img src={post.postImg} />
              </div>

              <div className="p-5">
                <h2 className="text-xl mb-2">{post.postTitle}</h2>
                <p>{post.postContent}</p>

                <div className="line" style={{ marginTop: "2rem" }}></div>

                <div className="flex flex-row mt-6 mb-3">
                  <PostComment postId={parseInt(post.id, 10)} navigate={navigate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default PostModal;
