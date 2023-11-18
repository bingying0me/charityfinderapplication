import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getCharitiesList } from "../api/charityapi";
import { CharityType } from "../types/charity.types";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const storedPostsString = localStorage.getItem("posts") ?? "[]";
  const [posts, setPosts] = useState<CharityType[]>(
    JSON.parse(storedPostsString)
  );
  const [searchWord, setSearchWord] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const words: string[] = [
    "aapi-led",
    "adoption",
    "afghanistan",
    "animals",
    "art",
    "athletics",
    "autism",
    "black-led",
    "buddhism",
    "cancer",
    "cats",
    "christianity",
    "climate",
    "conservation",
    "coronavirus",
    "culture",
    "dance",
    "disabilities",
    "disease",
    "dogs",
    "education",
    "environment",
    "filmandtv",
    "food-security",
    "freepress",
    "gender-equality",
    "health",
    "hinduism",
    "housing",
    "humans",
    "hurricane-ian",
    "immigrants",
    "indigenous-led",
    "indigenous-peoples",
    "islam",
    "judaism",
    "justice",
    "latine-led",
    "legal",
    "lgbt",
    "libraries",
    "mental-health",
    "museums",
    "music",
    "oceans",
    "parks",
    "poverty",
    "racial-justice",
    "radio",
    "refugees",
    "religion",
    "research",
    "science",
    "seniors",
    "space",
    "theater",
    "transgender",
    "ukraine",
    "veterans",
    "votingrights",
    "water",
    "wildfires",
    "wildlife",
    "women-led",
    "womens-health",
    "youth",
  ];

  const handleCharitiesList = async (searchWord: string) => {
    try {
      const response = await getCharitiesList(searchWord);
      const newPosts = response.nonprofits;
  
      // Save new posts to local storage
      localStorage.setItem("posts", JSON.stringify(newPosts));
  
      // Update state with new posts
      await setPosts(newPosts);

      // Navigate back to the desired route with the updated state
      navigate(`/searchresult?search=${encodeURIComponent(searchWord)}`);
  
      // Close the dropdown and clear searchWord
      setSuggestions([]);
      setSearchWord("");
    } catch (error: any) {
      console.error("Error getting Charity List:", error.message);
    }
  };

  const handleSearch = (word: string) => {
    // Call handleCharitiesList when the user presses the search icon or Enter key
    handleCharitiesList(word);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === "Enter") {
      handleSearch(searchWord);
    }
  };

  const handleInputChange = (value: string) => {
    // Update search word and filter suggestions
    setSearchWord(value);
    const filteredSuggestions = words.filter((word) =>
      word.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    // Handle suggestion click
    handleSearch(value);
  };

  // Set the width of the suggestion dropdown to be equal to the width of the input
  useEffect(() => {
    if (inputRef.current) {
      const inputWidth = inputRef.current.offsetWidth;
      const dropdown = document.getElementById("suggestion-dropdown");
      if (dropdown) {
        dropdown.style.width = `${inputWidth}px`;
      }
    }
  }, [searchWord]);

  return (
    <>
      <div>
        <div className="flex justify-between bg-white-0 p-5">
          <a href="/">
            <img src="/images/logo.png" alt="" className="h-12" />
          </a>
          <div className="relative flex w-1/2 flex-wrap items-stretch">
            <input
              ref={inputRef}
              type="search"
              value={searchWord}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            {suggestions && suggestions.length > 0 && (
              <div
                id="suggestion-dropdown"
                className="absolute z-10 w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-md max-h-48 overflow-y-auto top-full"
              >
                {suggestions.map((suggest) => (
                  <div
                    key={suggest}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggest)}
                  >
                    {suggest}
                  </div>
                ))}
              </div>
            )}
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
              onClick={() => handleSearch(searchWord)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-7 w-7 text-gray-900  hover:text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <Link to="favorites">
            <svg
              className="h-10 w-10 pr-1 text-gray-900 hover:text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
