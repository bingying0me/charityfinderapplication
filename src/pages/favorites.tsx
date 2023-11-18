import React from "react";
import CharityList from "../components/charityList";

const Favorites: React.FC = () => {
  // Get favorites from local storage
  const favoritesString = localStorage.getItem("favorites") || "[]";
  const favorites = JSON.parse(favoritesString);

  return (
    <div>
      <div className="py-10 sm:py-15 lg:mx-0 items-center bg-gradient-to-r from-emerald-100 to-blue-300">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Favorites
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 sm:py-15">
        <CharityList posts={favorites} />
      </div>
    </div>
  );
};

export default Favorites;
