import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  searchToken: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.prodctproductID === newItem.productproductID
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          productID: newItem.productID,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    deleteItem: (state, action) => {
      const productID = action.payload;
      const existingItem = state.cartItems.find((item) => item.productID === productID);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.productID !== productID);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    //To search function Products in shop page
    searchingProduct: (state, action) => {
      const { searchToken } = action.payload;
      state.searchToken = searchToken;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
