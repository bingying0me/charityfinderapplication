import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharityList from "../components/charityList";

const searchresult = () => {
  // Retrieve posts from local storage or use a default empty array
  const storedPostsString = localStorage.getItem("posts") ?? "[]";
  const [posts, setPosts] = useState(JSON.parse(storedPostsString));
  const { searchWord } = useParams();

  useEffect(() => {
    // Load posts from local storage on component mount
    const storedPosts = JSON.parse(storedPostsString);
    setPosts(storedPosts);
  }, [storedPostsString]);

  useEffect(() => {
    const storedPosts = JSON.parse(storedPostsString);
    setPosts(storedPosts);
  }, [searchWord]);

  return (
    <div>
      <div className="py-10 sm:py-15 lg:mx-0 items-center bg-gradient-to-r from-emerald-100 to-blue-300">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Search Result
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-15">
        <CharityList posts={posts} />
      </div>
    </div>
  );
};

export default searchresult;
