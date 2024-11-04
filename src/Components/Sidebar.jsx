import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByCategoryAndPriceRange,
  setProduct,
} from "../Redux/ProductSlice";

const Sidebar = () => {
  const products = useSelector((state) => state.product.originalData);
  const products2 = useSelector((state) => state.product.filteredData);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const priceRanges = [
    { label: "Under $10", min: 0, max: 10 },
    { label: "$10 - $40", min: 10, max: 40 },
    { label: "$40 - $80", min: 40, max: 80 },
    { label: "$80 - $120", min: 80, max: 120 },
    { label: "Above $120", min: 120, max: Infinity },
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleCategoryChange = (e) => {
    const newCategory =
      e.target.value === selectedCategory ? "" : e.target.value;
    setSelectedCategory(newCategory);
    dispatch(
      filterByCategoryAndPriceRange({
        category: newCategory,
        priceRange: selectedPriceRange
          ? priceRanges.find((range) => range.label === selectedPriceRange)
          : null,
      })
    );
  };

  const handlePriceRangeChange = (e) => {
    const selectedLabel = e.target.value;
    const range = priceRanges.find((r) => r.label === selectedLabel) || null;
    const newPriceRange = selectedLabel === selectedPriceRange ? null : range;
    setSelectedPriceRange(newPriceRange ? selectedLabel : "");
    dispatch(
      filterByCategoryAndPriceRange({
        category: selectedCategory,
        priceRange: newPriceRange,
      })
    );
  };

  return (
    <div className="sidebar px-10 py-14  shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white h-full ">
      <div>
        <h2 className="text-xl font-bold">CATEGORIES</h2>
        <div className="mt-3 mb-7">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : (
            <div className="categories">
              {categories.map((category) => (
                <div key={category} className="flex items-center mb-2  ">
                  <input
                    type="checkbox"
                    id={category}
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                    className="mr-2 "
                  />
                  <label htmlFor={category} className="cursor-pointer">
                    {capitalizeFirstLetter(category)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mt-12">PRICE-RANGES</h2>
        <div className="mt-2 prices ">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex  mb-2  items-center ">
              <input
                type="checkbox"
                id={`price-${index}`}
                name="priceRange"
                value={range.label}
                checked={selectedPriceRange === range.label}
                onChange={handlePriceRangeChange}
                className="mr-2"
              />
              <label htmlFor={`price-${index}`} className="cursor-pointer">
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
