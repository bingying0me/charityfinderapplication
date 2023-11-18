import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CharityListProps } from "../types/charity.types";

const CharityList: React.FC<CharityListProps> = ({ posts }) => {
  const navigate = useNavigate();
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const navigateToCharityDetail = (charityName: string) => {
    navigate(`/charitydetail?name=${encodeURIComponent(charityName)}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);

  return (
    <div>
      <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 break-words">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((post) => (
            <div
              key={post.ein}
              className="flex max-w-xl flex-col items-start py-5 px-10 border-dashed border-2 border-indigo-200 rounded hover:bg-indigo-200 cursor-pointer"
              onClick={() => navigateToCharityDetail(post.name)}
            >
              <div className="flex items-center gap-x-4 gap-y-1 text-xs flex-wrap">
                {post.tags &&
                  post.tags.slice(0, 3).map((tag, index) => (
                    <div
                      key={index}
                      className="relative z-10 rounded-full bg-gray-50 font-medium text-gray-600 hover:bg-gray-100 px-2"
                    >
                      {tag}
                    </div>
                  ))}
              </div>
              <div className="relative mt-3 flex items-center gap-x-4">
                {post.logoUrl ? (
                  <img
                    src={post.logoUrl}
                    alt={`Logo of ${post.name}`}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                ) : (
                  <div className="h-12 w-12 min-h-12 min-w-12">
                    <svg
                      className="h-12 w-12 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
                <div className="text-start text-sm leading-6">
                  <div className="font-semibold text-gray-900 border-b-2 border-indigo-200 border-b-indigo-500">
                    <h2 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {post.name}
                    </h2>
                  </div>
                  <div
                    className={
                      post.location
                        ? "flex flex-nowrap items-center text-gray-900"
                        : "hidden"
                    }
                  >
                    <div className="h-5 w-5 min-h-5 min-w-5">
                      <svg
                        className="h-5 w-5 text-gray"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5" // Adjust this value to control the thickness of the lines
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
                    </div>
                    <div className="pl-1">{post.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mx-auto text-center text-gray-500 mt-5 lg:col-span-3">
            No Charity Found
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`mx-1 px-3 py-1 ${
                currentPage === page + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityList;