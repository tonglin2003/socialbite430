import "./Contact.css";

import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import vitali from "./vitali.jpg";
import Rodaina from "./rodaina.jpg";
import tong from "./tong.jpg";
import William from "./William.jpeg";
import Jay from "./Jay.jpg"

export default function Contact() {
  return (
    <>
      <div className="contact-body">
        <div className="main">
          <div className="profile-card">
            <div className="img">
              <img src={William} />
            </div>
            <div className="caption">
              <h3>Wenxuan Chen</h3>
              <p>Full-stack developer</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/wenxuan-chen-94bb48277"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/WenxuanChen1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </div>
          </div>
          <div className="profile-card">
            <div className="img">
              <img src={tong} />
            </div>
            <div className="caption">
              <h3>Tong Lin</h3>
              <p>Full-stack developer</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/lin-tong-522a0523a"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/tonglin2003"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </div>
          </div>
          <div className="profile-card">
            <div className="img">
              <img src={Rodaina} />
            </div>
            <div className="caption">
              <h3>Rodaina Eid</h3>
              <p>Frontend Developer</p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/rodeinaeid"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/Roudieid"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </div>
          </div>


          <div className="profile-card">
            <div className="img">
              <img src={vitali} />
            </div>
            <div className="caption">
              <h3>Vitaliy Prymak</h3>
              <p>Front End Developer</p>
              <div className="social-links">
                <a
                  href="http://www.linkedin.com/in/vitaliy-prymak"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/VitaliPri"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithubSquare />
                </a>
              </div>
            </div>
          </div>




        </div>
      </div>
    </>
  );
}
