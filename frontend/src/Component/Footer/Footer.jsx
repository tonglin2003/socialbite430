import "./FooterStyle.css"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className="footer">
            <div className="top-footer">
                <Link to="/">Home</Link>
                <Link to="aboutapp">About</Link>
                <Link to="faq">FAQ</Link>
                <Link to="">Settings</Link>
                <Link to="contact">Contact Us</Link>
            </div>
            <div className="bottom-footer">
                <img className="footer-icon" src="/src/assets/icon.png" />
                <p> @SocialBites, Inc</p>
            </div>
        </div>
    )
}