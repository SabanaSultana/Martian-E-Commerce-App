import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice";
import themeReducer from './ThemeSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    theme: themeReducer,
  },
});

export default store;
