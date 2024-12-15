import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import PostComment from "../../Component/ModalWindow/CommentButton/CommentButton";
import LikePost from "./LikePost";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function SinglePost({ post, isCorrectUser }) {
  // take restaurantId as a param for loader
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [likesCount, setLikesCount] = useState(null);
  const [isLikesSync, setIsLikesSync] = useState(false);

  //Get All like count
  useEffect(() => {
    async function fetchLikesCount() {
      const apiRes = await fetch(
        `/api/restaurant_post/${post?.id}/likes/count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await apiRes.json();
      setLikesCount(res);
      setIsLikesSync(false);
    }
    fetchLikesCount();
  }, [isLikesSync]);

  return (
    <div key={`${post.id}`} className="flex flex-col mt-8 bg-white">
      <div className="">
        <div className="post-creator m-5">{post?.Restaurant?.restaurantName || post?.restaurantName || "Name is missing"}</div>
        <div className="line"></div>
        <div>
          <div  >
            <img src={post.postImg} />
          </div>

          <div className="p-5">
            <h2 className="text-xl mb-2">{post.postTitle}</h2>
            <p>{post.postContent}</p>

            <div className="line" style={{ marginTop: "2rem" }}></div>

            <div className="flex flex-row mt-6 items-center justify-between">
              <div className="flex items-center gap-2 w-full">
                <LikePost
                  postId={post.id}
                  isLiked={
                    likesCount?.postId === post?.id && likesCount?.likeCount > 0
                      ? true
                      : false
                  }
                  setIsLikesSync={setIsLikesSync}
                />
                <PostComment
                  postId={parseInt(post.id, 10)}
                  navigate={navigate}
                />
              </div>

              <fetcher.Form
                method="post"
                action={`/restaurant_post/delete/${post.id}`}
                className=""
                onSubmit={(event) => {
                  if (
                    !confirm("Please confirm you want to delete this record.")
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                {isCorrectUser ? (
                  <button className="mr-2">
                    <FaTrash
                      className="trashIcon"
                      style={{ fontSize: "1.3em" }}
                    />
                  </button>
                ) : null}
              </fetcher.Form>
            </div>
            <div>
              <p>
                {likesCount?.postId === post?.id ? likesCount?.likeCount : 0}{" "}
                people liked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
