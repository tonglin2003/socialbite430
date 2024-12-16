//creating tag
export const createTag = async ({ tag }) => {
  const response = await fetch(`/api/tag/user/${tag}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create tag");
  }
  const newTag = await response.json();
  return newTag;
};

//Get the users all tags
export const getUsersTags = async () => {
  const response = await fetch(`/api/tag/user`);
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  const tags = await response.json();
  return tags;
};

//getting users tags
export const getPublicTags = async () => {
  const response = await fetch("/api/tags");
  if (!response.ok) {
    throw new Error("Failed to fetch user tags");
  }
  const tags = await response.json();
  return tags;
};

//delete tags
export const deleteTags = async (tagId) => {
  const response = await fetch(`/api/tag/user/${tagId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete tags");
  }
  return true;
};
