import { Form } from "react-router-dom"
import "./CommentButton.css"
import { AuthContext } from "../../../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"

export default function PostComment({ postId, navigate }){

    // used to fetch for user's profile image
    const {currentUser} = useContext(AuthContext);

    // handle display comment display button
    const [commentDisplay, setCommentDisplay] = useState(false);

    // fetch the comment of current post
    const [comments, setComments] = useState([]);
    const [commentFetched, setCommentFetched] = useState(false); // prevent unneeded fetching to the database

    // functions to fetch comment
    async function fetchComment(postId){
        try{
            const comments = await fetch(`/api/restaurant_post/${postId}/comment`);
            const commentsJson = await comments.json();
            setComments(commentsJson);
        } catch(error){
            console.error('Error fetching data:', error.message);
        }
    }
    useEffect(() => {
        
        if (commentDisplay && (!commentFetched)){
            fetchComment(postId);
            setCommentFetched(true);
        }
    }, [commentDisplay, postId]);


    // when click: display or not display comment && fetch for comments
    const handleOnClick = () => {
        setCommentDisplay(!commentDisplay);
    }

    // handle submit comment
    const [commentInput, setCommentInput] = useState("");
    const onCommentChange = (e) => {
        setCommentInput(e.target.value);
    }
    const onCommentSubmit = async (e) => {
        console.log("Submit button clicked"); // Check if the function is being called
      
        if (!currentUser) {
            // if user is not logged in, redirect to login page
            e.preventDefault();
          console.log("User is not logged in. Navigating...");
          return navigate("/login");
        } else {
            // if user is logged in, upload the content
          e.preventDefault();
            try{
                const response = await fetch(`/api/restaurant_post/${postId}/comment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({content: commentInput})
                })

                if (response.ok) {
                    alert("Comment uploaded successfully!");
                    fetchComment(postId);
                } else {
                    alert("Failed to upload comment ");
                    console.log(response)
                }
            }catch(error){
                alert("An error occured: " + error.message);
            }
            setCommentInput("");
        }
    };      

    return(
        <>
        <div className="flex flex-col">
            <button style={{color: "black", transition: "0.2s", cursor: "pointer"}}>
                <svg width="35px" height="35px" 
                className="hover:fill-gray-300"
                onClick={handleOnClick}
                type="button"
                viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.5 12C5.49988 14.613 6.95512 17.0085 9.2741 18.2127C11.5931 19.4169 14.3897 19.2292 16.527 17.726L19.5 18V12C19.5 8.13401 16.366 5 12.5 5C8.63401 5 5.5 8.13401 5.5 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.5 13.25C9.08579 13.25 8.75 13.5858 8.75 14C8.75 14.4142 9.08579 14.75 9.5 14.75V13.25ZM13.5 14.75C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25V14.75ZM9.5 10.25C9.08579 10.25 8.75 10.5858 8.75 11C8.75 11.4142 9.08579 11.75 9.5 11.75V10.25ZM15.5 11.75C15.9142 11.75 16.25 11.4142 16.25 11C16.25 10.5858 15.9142 10.25 15.5 10.25V11.75ZM9.5 14.75H13.5V13.25H9.5V14.75ZM9.5 11.75H15.5V10.25H9.5V11.75Z" fill="#000000"></path> </g></svg>
            </button>

            <div className={(commentDisplay)? "block" : "hidden"}>
                <div className={`flex flex-row justify-center`}>
                    {  (currentUser)? (<img src={currentUser.profileImage} className="rounded-full w-10 h-10 mt-4 mr-5"/>) : (<img src="/src/assets/default-avatar.webp" className="rounded-full w-10 h-10 mt-4 mr-5"/>) }
                    
                    <Form onSubmit={onCommentSubmit} className="flex flex-row"> 
                        <fieldset className="flex flex-col my-5 w-96">
                            <input
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder="Reply"
                            className="reply-input-field border-1 rounded-full focus:outline-none px-5 "
                            onChange={onCommentChange}
                            value={commentInput}
                            />
                        </fieldset>
                        <button type="submit" className="ml-5">
                            <p>Reply</p>
                        </button>
                    </Form>
                </div>
                <hr></hr>
                {comments.message !== "No Comments Found" ? (
                    comments.map((comment) => (
                        <div className="flex flex-row" key={comment.id}>
                        <img
                            src={comment.User.profileImage}
                            className="rounded-full w-10 h-10 mt-4 mr-5"
                        />
                        <div className="mt-4 border border-gray-300 p-4 rounded-lg">{comment.content}</div>
                        </div>
                    ))
                    ) : (
                    <div className="flex justify-center my-10 text-gray-400">
                        Be the first one to comment!
                    </div>
                    )
                }

            </div>
        </div>

        </>
    )
}