import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import "./AboutApp.css";
import about from "./about.png";

export default function AboutApp() {
  return (
    <>
      <div className="aboutap">
        <section className="about-app">
          <div className="main-about">
            <img src={about} />
          </div>
          <div className="all-text">
            <h4>Welcome to SocialBites!</h4>
            <h1>Where Food & Fun Unite!</h1>
            <p>
              We are thrilled to present a unique dining experience that
              connects two important groups - the passionate food enthusiasts
              and the thriving restaurant businesses. Our platform allows
              restaurants to host their very own pages, enabling them to share
              exclusive deals and exciting events directly with all users.
            </p>
            <div className="btn-about">
              <button type="button">
                <Link to="/about">Learn More</Link>
              </button>
              <button type="button" className="btn2">
                <Link to="/contact">Our Team</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
