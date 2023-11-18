import { useState, useEffect } from "react";
import { getCharitiesList } from "../api/charityapi";
import { CharityType } from "../types/charity.types";
import CharityList from "../components/charityList";

const Home = () => {
  const storedPostsString = localStorage.getItem('posts') ?? '[]';
  const [posts, setPosts] = useState<CharityType[]>(JSON.parse(storedPostsString));

  const handleCharitiesList = async () => {
    try {
      const response = await getCharitiesList("");
      const newPosts = response.nonprofits;

      // Update state with new posts
      setPosts(newPosts);

      // Save new posts to local storage
      localStorage.setItem('posts', JSON.stringify(newPosts));
    } catch (error: any) {
      console.error("Error getting Charity List:", error.message);
    }
  };

  useEffect(() => {
    handleCharitiesList();
  }, []);

  return (
    <div>
      <img src="/images/banner.png" alt="" className="w-full" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-15">
        <div className="lg:mx-0 items-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Charity List
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            You May Interest
          </p>
        </div>
        <CharityList posts={posts} />
      </div>
    </div>
  );
};

export default Home;