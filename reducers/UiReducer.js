import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UiReducer = createSlice({
  name: "ui",
  initialState: {
    drawer: false,
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    toggleDrawerModal(state, action) {
      state.drawer = action.payload;
    },

    addCartRow(state, action) {
      const itemExists = state.cart.some((item) => item.id === action.payload.id); // assuming each item has a unique 'id'

      if (!itemExists) {
        const itemWithQuantity = { ...action.payload, qnty: 1 };
        state.cart.push(itemWithQuantity);
        AsyncStorage.setItem("cart", JSON.stringify(state.cart)); // Save cart to AsyncStorage
      }
    },

    increseCartRow(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);

      if (item && item.qnty < item.quantity) {
        
        item.qnty += 1; // Increase quantity
        
        AsyncStorage.setItem("cart", JSON.stringify(state.cart)); // Update AsyncStorage
      }
    },

    decreaseCartRow(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);
     
      if (item && item.qnty > 1) {

        item.qnty -= 1; // Decrease quantity
        AsyncStorage.setItem("cart", JSON.stringify(state.cart)); // Update AsyncStorage
      }
     
    },

    clearCartRow(state, action) {
      state.cart = [];
      AsyncStorage.setItem("cart", JSON.stringify(state.cart)); // Clear AsyncStorage
    },

    removeSelectedCart(state, action) {
      state.cart = state.cart.filter((row) => row.id !== action.payload.id); // assuming 'id' is unique
      AsyncStorage.setItem("cart", JSON.stringify(state.cart)); // Update AsyncStorage
    },
  },
});

const { actions } = UiReducer;

export const {
  toggleDrawerModal,
  addCartRow,
  clearCartRow,
  removeSelectedCart,
  increseCartRow,
  decreaseCartRow,
} = actions;

export default UiReducer;