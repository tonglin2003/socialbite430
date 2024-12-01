import { Form, Link } from "react-router-dom";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // to get the input from the user
  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle when user submit the search form
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (searchTerm) {
      navigate(`/search/${searchTerm}`); // Navigate to the search results page
    } else {
      navigate("/"); // If the search term is empty, navigate to the home page
    }
  };

  return (
    <div className="outer">
      <div className="outer-body">
        <Form method="get" className="box" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search For Restaurant"
            className="search-input"
            onChange={handleOnChange}
          />
          <button className="link" type="submit">
            <FaSearch className="icon" />
          </button>
        </Form>
      </div>
    </div>
  );
}
