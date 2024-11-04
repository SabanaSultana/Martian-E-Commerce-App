import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../Redux/CartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const allProducts = useSelector((state) => state.product.filteredData);
  const status = useSelector((state) => state.product.status); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  return (
    <div className="container mx-auto px-4 py-3">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 mt-4 ">
        Product List..
      </h2>

      {/* Loading Spinner */}
      {status === "loading" ? (
        <div className="flex justify-center items-center h-[85vh] w-[85vw]">
          <div className="loader border-t-4 border-cGreen rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : currentProducts.length === 0 ? (
        <div className=" text-gray-900 dark:text-gray-300  flex justify-center items-center h-[70vh] w-[70vw] text-xl ">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between border border-gray-100 dark:border-gray-600"
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-img w-full h-40 object-cover rounded-t-lg mb-3"

              />
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1 h-12 overflow-hidden">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 h-6">
                  ${product.price.toFixed(2)}
                </p>
                {product.rating && (
                  <p className="text-yellow-500 text-xs font-medium mb-3">
                    Rating: {product.rating.rate} ⭐
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  if (!isInCart(product.id)) {
                    dispatch(add(product));
                  }
                }}
                className={`${
                  isInCart(product.id)
                    ? "bg-gray-600"
                    : "bg-cGreen hover:bg-opacity-90"
                } text-white text-sm font-medium py-1.5 px-3 rounded w-full mt-auto`}
                disabled={isInCart(product.id)}
              >
                {isInCart(product.id) ? "Item Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {Array.from(
          { length: Math.ceil(allProducts.length / productsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1.5 rounded-lg ${
                currentPage === index + 1
                  ? "bg-cGreen text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              } transition-colors duration-300`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
