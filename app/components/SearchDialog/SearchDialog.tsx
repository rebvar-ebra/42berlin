"use client";
import React, { useState } from "react";

function SearchDialog() {
  const [query, setQuery] = useState(""); // State to capture search input

  // Function to toggle the dialog visibility


  return (
    <div className="relative">

      {/* Search dialog */}

        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-lg">
          {/* Search input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          {/* Display the text entered */}
          <div className="mt-2 text-sm text-gray-600">
            You are searching for: <span className="font-medium">{query}</span>
          </div>

          {/* Footer with close button */}
          <div className="text-right mt-6">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default SearchDialog;
