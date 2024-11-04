import { createSlice } from "@reduxjs/toolkit";

export const statuses = Object.freeze({
  success: "success",
  error: "error",
  loading: "loading",
});

const productSlice = createSlice({
  name: "Product",
  initialState: {
    originalData: [],
    filteredData: [],
    status: statuses.success,
  },
  reducers: {
    setProduct(state, action) {
      state.originalData = action.payload;
      state.filteredData = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    searchProduct(state, action) {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm) {
        const filtered = state.originalData.filter((product) =>
          product.title.toLowerCase().startsWith(searchTerm)
        );
        state.filteredData = filtered;
      } else {
        state.filteredData = state.originalData;
      }
    },

    sortProduct(state, action) {
      const { sortBy, order } = action.payload;
      state.filteredData = [...state.filteredData].sort((a, b) => {
        const priceA = a[sortBy];
        const priceB = b[sortBy];
        if (order === "asc") {
          return priceA - priceB;
        } else if (order === "desc") {
          return priceB - priceA;
        }
        return 0;
      });
    },
    filterByCategoryAndPriceRange(state, action) {
      const { category, priceRange } = action.payload;

      let filtered = state.originalData;

      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      if (priceRange) {
        const { min, max } = priceRange;
        filtered = filtered.filter(
          (product) => product.price >= min && product.price <= max
        );
      }

      state.filteredData =
        category || priceRange ? filtered : state.originalData;
    },
  },
});

export const {
  setProduct,
  setStatus,
  searchProduct,
  sortProduct,
  filterByCategoryAndPriceRange,
} = productSlice.actions;

export default productSlice.reducer;

//middleware for api call ... Thunk

export function fetchProduct() {
  return async function fetchProductThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      //   console.log("product data", data);
      dispatch(setProduct(data));
      dispatch(setStatus(statuses.success));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(statuses.ERROR));
    }
  };
}
