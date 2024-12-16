import "./Tags.css";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { createTag, deleteTags, getUsersTags } from "./operations";

function Tags() {
  const fakeData = useLoaderData() || [];
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [searchedValue, setSearchedValue] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [error, setError] = React.useState("");
  const [deleted, setDeleted] = React.useState(false);
  const [addedTag, setAddedTag] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUsersTags();
        if (response) {
          setSelectedTags(response);
          setError("");
        } else {
          setError("Failed to fetch tags");
        }
      } catch (error) {
        console.error("An error occurred while fetching tags:", error);
      }
    }
    fetchData();
  }, [deleted, addedTag]);

  React.useEffect(() => {
    if (Array.isArray(fakeData)) {
      const searchedResult = fakeData.filter((value) =>
        value?.tag?.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchedValue(searchedResult);
    } else {
      console.error("Invalid fakeData format:", fakeData);
      setSearchedValue([]);
    }
  }, [inputValue, fakeData]);

  const handleEventChang = (event) => {
    const value = event.target.value;
    if (value) {
      setIsOpen(true);
      setInputValue(value);
    } else {
      setIsOpen(false);
      setInputValue("");
    }
  };

  const handleAddTags = async (data) => {
    setInputValue("");
    const tagExist = selectedTags?.filter((tag) => tag.tag === data.tag);
    if (tagExist?.length === 0) {
      const getTag = await createTag({ tag: data.id });
      setAddedTag(getTag);
      setIsOpen(false);
      setError("");
    } else {
      setError("Tag is already added");
      setIsOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const tagDeleted = await deleteTags(id);
      if (tagDeleted) {
        const updatedTags = selectedTags.filter((tag) => tag.tagid !== id);
        setSelectedTags(updatedTags);
        setDeleted(tagDeleted);
      }
    } catch (error) {
      console.error("An error occurred while deleting tag:", error);
    }
  };

  return (
    <div className="App">
      <section className="tags-section">
        <div className="tags-box">
          <h3>Tags</h3>
          <input
            className="search-input"
            value={inputValue}
            placeholder="Find tags"
            onChange={handleEventChang}
          />
          {error && (
            <p style={{ padding: "10px 0px", color: "red" }}>{error}</p>
          )}
          <div className="selected-tags">
            {selectedTags?.map(({ tagid, tag }) => (
              <div className="selected-tag" key={tagid}>
                <p>{tag}</p>
                <button
                  onClick={() => handleDelete(tagid)}
                  className="delete-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {isOpen && (
            <div className="tags-suggestion-box">
              {searchedValue && searchedValue.length === 0 ? (
                <p>No tags available</p>
              ) : (
                searchedValue?.map((data) => (
                  <p onClick={() => handleAddTags(data)} key={data.id}>
                    {data.tag}
                  </p>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tags;

export const loadTag = async () => {
  try {
    const res = await fetch("/api/tag");
    if (!res.ok) {
      throw new Error(`Error fetching tags: ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to load tags:", error);
    return [];
  }
};
