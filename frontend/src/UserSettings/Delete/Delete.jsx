import "./Delete.css";
import {
  Form,
  redirect,
} from "react-router-dom/dist/umd/react-router-dom.development";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export default function Delete() {
  return (
    <div className="delete">
      <Form method="delete">
        <div className="containerr">
          <h3 className="title-delete">Are you sure?</h3>
          <p className="sub-heading">
            This is going to be permanently delete, are you sure?
          </p>
          <div className="warning">
            <BsFillExclamationTriangleFill className="triangle" />
            <p className="warn-para">
              By deleting this restaurant, you can`t restore it later!
            </p>
          </div>
          <button className="yes-delete">Yes, Delete</button>
        </div>
      </Form>
    </div>
  );
}

export async function deleteUserAction({ request, params }) {
  console.log(params);
  const response = await fetch(`/api/user/delete_user_account/`, {
    method: "DELETE",
  });

  return redirect("/");
}
