import { createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../model/model";
import { RootState } from "./store";

export interface CartState {
  products: ProductModel[];
  quantity: number;
  total: number;
}

const initialState: CartState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let find = state.products.findIndex(
        (item) =>
          //combine if same id,size,color else create new cart product
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (find >= 0) {
        state.products[find].quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
  },
  extraReducers: {},
});

export const {
  /*TODO:reducers actions */
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
