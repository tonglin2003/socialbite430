import { Form, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const { currentUser, login, authError } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData);
    await login(credentials);
  };

  return (
    <div className="img-signup h-screen flex flex-col items-center justify-center">

      <Form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 flex items-center"
      >
          <Link to="/" className="flex h-full">
            <img
              className="logo h-16 border-black"
              src="/src/assets/socialbites-logo.png"
              alt="logo"
              style={{filter: "grayscale(100%) brightness(1000%)"}}
            />
          </Link>
            

        <div className="border-solid rounded-lg p-10 mt-8 shadow-2xl background-color w-96">
          <h2 className="text-2xl mt-5 w-32 font-medium ml-5" style={{fontFamily: "Dosis"}}>
            Login 
          </h2>
          <hr className="ml-5 w-12 border-b-4 rounded mt-3" style={{borderColor: "#EA5455"}}></hr>
          <hr className="mb-5" style={{borderColor: "rgba(100,100,100, 0.1)"}}></hr>

          {authError && <div className="text-red-500">{authError}</div>}

          <fieldset className="flex flex-col my-5">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="auth-input-field border-1 rounded-full focus:outline-none px-5 "
            />
          </fieldset>
          <fieldset className="flex flex-col my-5">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="auth-input-field border-1 rounded-full focus:outline-none px-5"
            />
          </fieldset>
          <div className="text-center">
            <input
              className="bg-red-700 hover:bg-red-800 text-white rounded-full transition mb-4 py-2.5 cursor-pointer w-72"
              type="submit"
              value="Login"
              style={{background: "#EA5455"}}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f2a19b")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#EA5455")}
            ></input>
          </div>
          <p>Don&apos;t have an account? <Link to="/signup" style={{color: "#EA5455", textDecoration: "underline"}}>Sign up here</Link></p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
