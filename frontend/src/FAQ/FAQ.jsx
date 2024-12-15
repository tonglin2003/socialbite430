import "./FAQ.css";

export default function About() {
  return (
    <>
      <div className="faq-body">
        <div className="faq-container">
          <h1 className="faq-title">Frequently Asked Questions?</h1>
          <div className="tab">
            <input type="radio" name="acc" id="acc1" />
            <label htmlFor="acc1">
              <h2>01</h2>
              <h3>How can I list my restaurant?</h3>
            </label>
            <div className="content">
              <p>
                To add a restaurant, you must be logged in as a user. After
                logging in, navigate to your User Account page and locate the
                Add Restaurant option on the left panel.
              </p>
            </div>
          </div>
          <div className="tab">
            <input type="radio" name="acc" id="acc2" />
            <label htmlFor="acc2">
              <h2>02</h2>
              <h3>How can I update my information?</h3>
            </label>
            <div className="content">
              <p>
                To update your information, please log in and navigate to the
                top right corner of the screen where you will see your User
                Avatar image. Click on it to reveal a drop-down menu, then
                select User Settings to access the relevant page.
              </p>
            </div>
          </div>
          <div className="tab">
            <input type="radio" name="acc" id="acc3" />
            <label htmlFor="acc3">
              <h2>03</h2>
              <h3>Can I list more than one restaurant?</h3>
            </label>
            <div className="content">
              <p>Yes, you can.</p>
            </div>
          </div>
          <div className="tab">
            <input type="radio" name="acc" id="acc4" />
            <label htmlFor="acc4">
              <h2>04</h2>
              <h3>Can I review the restaurant?</h3>
            </label>
            <div className="content">
              <p>
                Certainly! To leave a review, simply navigate to the restaurant
                page and locate the Reviews tab in the left panel. Clicking on
                it will take you to the reviews page where you can find the Add
                Review button
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
