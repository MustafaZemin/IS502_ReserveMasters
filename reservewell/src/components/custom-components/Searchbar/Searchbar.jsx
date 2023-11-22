import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import React, { useRef } from "react";

const Searchbar = ({ label, setSearchKeyword, id }) => {
  const searchInputRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInputRef.current) {
      setSearchKeyword(searchInputRef.current.value);
      window.scrollTo({
        top: window.innerHeight, // Scroll down by half of the viewport height + 96 pixels
        behavior: "smooth", // Optional: Add smooth scrolling animation
      });
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full rounded-lg bg-neutral p-8">
      <div className="text-start">
        <p className="mb-1 text-sm font-semibold">{label}</p>
        <div className="flex items-center">
          <input
            type="text"
            name="searchbar"
            id={id || "searchbar"}
            ref={searchInputRef}
            placeholder="Le Petit Bistro"
            className="w-full rounded-l-lg border-2 p-4"
          />
          <button type="submit" className="bg-rwScarlet p-4 text-white">
            <SearchIcon />
          </button>
          <button
            type="reset"
            className="rounded-r-lg bg-rwKhaki  p-4 text-neutral"
            onClick={() => setSearchKeyword("")}
          >
            <ClearIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
