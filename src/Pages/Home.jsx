import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../Redux/ProductSlice";
import ProductDetails from "../Components/ProductDetails";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 dark:bg-gray-900 h-auto">
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <ProductDetails />
      </div>
    </div>
  );
};

export default Home;
