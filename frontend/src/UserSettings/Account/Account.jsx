import { Form } from "react-router-dom";
import "./Account.css";
import { redirect } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Account() {
  return (
    <div className="account">
      <Form className="profile" method="patch">
        <h1 className="title">Personal Info</h1>
        <h2 className="sub-title">Username</h2>
        <input
          name="username"
          className="input"
          type="text"
          placeholder="laughnoodle"
        />
        <h2 className="sub-title">Email</h2>
        <input
          name="email"
          className="input"
          type="email"
          placeholder="laughnoodle@email.com"
        />
        <button type="submit" className="btn-user">
          Update
        </button>
      </Form>
    </div>
  );
}

export async function editUserAction({ request, params }) {
  console.log("adfasd");
  let formData = await request.formData();
  let userData = Object.fromEntries(formData);
  console.log(userData);
  const response = await fetch(`/api/user/editUser`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return redirect("/");
}
