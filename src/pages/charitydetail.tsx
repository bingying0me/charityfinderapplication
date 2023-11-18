import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CharityDetail: React.FC = () => {
  const location = useLocation();
  const charityName = new URLSearchParams(location.search).get("name");

  const [details, setDetails] = useState<any>(null);
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  useEffect(() => {
    const postsString = localStorage.getItem("posts") ?? "[]";
    const posts = JSON.parse(postsString);

    // Find the details based on charityName in posts
    const charityDetailsFromPosts = posts.find(
      (post: any) => post.name === charityName
    );

    if (charityDetailsFromPosts) {
      setDetails(charityDetailsFromPosts);

      // Check if the charity is in favorites
      const favoritesString = localStorage.getItem("favorites") ?? "[]";
      const favorites = JSON.parse(favoritesString);
      const isAlreadyInFavorites = favorites.some(
        (fav: any) => fav.ein === charityDetailsFromPosts.ein
      );

      setIsInFavorites(isAlreadyInFavorites);
    } else {
      // If not found in posts, try to find in favorites
      const favoritesString = localStorage.getItem("favorites") ?? "[]";
      const favorites = JSON.parse(favoritesString);

      const charityDetailsFromFavorites = favorites.find(
        (fav: any) => fav.name === charityName
      );

      if (charityDetailsFromFavorites) {
        setDetails(charityDetailsFromFavorites);
        setIsInFavorites(true);
      }
    }
  }, [charityName]);

  const handleFavorites = () => {
    const favoritesString = localStorage.getItem("favorites") ?? "[]";
    const favorites = JSON.parse(favoritesString);

    if (isInFavorites) {
      // Remove charity from favorites
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.ein !== details?.ein
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add charity to favorites
      favorites.push(details);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // Toggle the favorites state
    setIsInFavorites(!isInFavorites);
  };

  if (!details) {
    return <div>Loading...</div>; // You might want to add a loading state
  }

  return (
    <div>
      <div className="py-10 sm:py-15 lg:mx-0 items-center bg-gradient-to-r from-emerald-100 to-blue-300">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Charity Detail
        </h2>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 sm:py-15 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        {details.coverImageUrl && (
          <div className="gap-4 sm:gap-6 lg:gap-8">
            <img
              src={details.coverImageUrl}
              alt="Charity Cover"
              className="rounded-lg bg-gray-100"
            />
          </div>
        )}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {details.name}
          </h2>
          {details.location && (
            <div className="mt-4 flex flex-nowrap justify-center items-center text-gray-900">
              <svg
                className="h-4 w-4 text-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="pl-1 text-gray-500">{details.location}</p>
            </div>
          )}
          <p className="mt-4 text-gray-900 border-dashed border-y-2 border-indigo-200">
            {details.description}
          </p>
          {details.tags && (
            <>
              <p className="mt-4 mb-2 text-gray-500 text-start">Tag:</p>
              <dl className="flex sm:gap-x-2 lg:gap-x-2 flex-nowrap">
                {details.tags.map((tag: string) => (
                  <div key={tag}>
                    <dt className="relative z-10 rounded-full bg-gray-50 font-medium text-gray-600 hover:bg-gray-100 px-2">
                      {tag}
                    </dt>
                  </div>
                ))}
              </dl>
            </>
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <button
              onClick={handleFavorites}
              className={`flex flex-nowrap items-center rounded-md ${
                isInFavorites ? "bg-green-500" : "bg-red-500"
              } px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray`}
            >
              <svg
                className="h-6 w-6 pr-1 text-gray-900"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
              </svg>
              {isInFavorites ? "Remove from favorites" : "Add to favorites"}
            </button>
            <a
              href="https://www.every.org/"
              className="flex flex-nowrap items-center text-sm font-semibold leading-6 text-gray"
            >
              <svg
                className="h-6 w-6 pr-1 text-gray-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />{" "}
                <path d="M13 13l6 6" />
              </svg>
              Check it in Every.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityDetail;
