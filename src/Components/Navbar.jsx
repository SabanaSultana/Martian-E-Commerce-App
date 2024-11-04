import React, { useState, useEffect } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../Redux/ThemeSlice";
import { searchProduct, sortProduct } from "../Redux/ProductSlice";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const filteredProducts = useSelector((state) => state.product.filteredData);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const cartItems = useSelector((state) => state.cart.items);
  console.log("length of cartItems ", cartItems.length);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(searchProduct(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchProduct(searchTerm));
    }
  };

  // console.log("Filtered products after searching ", filteredProducts);

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    dispatch(sortProduct({ sortBy: "price", order: newOrder }));
  };

  // console.log("Filtered products after sorting ", filteredProducts);

  return (
    <div className=" navbar flex items-center justify-between px-8 py-4 bg-cGreen dark:bg-cGreen z-40">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        Martian.
      </h1>

      <div className=" searching-sorting flex items-center gap-3">
        {/* Searching */}
        <div className="flex items-center bg-white dark:bg-black rounded-md p-2">
          <FaSearch className="text-black dark:text-white" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none px-2 text-black dark:text-white"
          />
        </div>
        {/* Sorting */}
        <button
          onClick={handleSort}
          className="flex items-center bg-white dark:bg-black rounded-md p-2 text-black dark:text-white gap-1"
        >
          Sort by Price
          <FaSort className="mr-1" />
          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
        </button>
      </div>

      <div className="flex items-center space-x-6 relative">
        <button
          className="text-black dark:text-white text-3xl"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {darkMode ? <MdLightMode  className="icon"/> : <MdDarkMode  className="icon"/>}
        </button>
        <Link to="/cart">
          <GiShoppingCart className=" icon text-black dark:text-white text-3xl" />
          <span className="text-white dark:text-black font-bold absolute bottom-0 right-1 top-3">{cartItems.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
