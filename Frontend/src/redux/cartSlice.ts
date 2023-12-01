import { createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../model/model";
import { RootState } from "../app/store";

export type ProductCartModel = ProductModel & {
  color: string;
  size: string;
  quantity: number;
};

export type CartState = {
  products: ProductCartModel[];
  cartQuantity: number;
  total: number;
};

const initialState: CartState = {
  products: [],
  cartQuantity: 0,
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
        state.cartQuantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    addCartQuantity: (state, action) => {
      const addIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (addIndex >= 0) {
        state.products[addIndex].quantity += 1;
      }
      state.total += action.payload.price;
    },
    reduceCartQuantity: (state, action) => {
      const reduceIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (reduceIndex >= 0) {
        state.products[reduceIndex].quantity -= 1;
      }
      state.total -= action.payload.price;
    },
    removeCartItem: (state, action) => {
      const deleteIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      console.log(deleteIndex);
      if (deleteIndex >= 0) {
        if (state.products.length === 1) {
          //last product remove and reset products
          state.products = [];
        } else {
          //remove selected product
          state.products.splice(deleteIndex, 1);
        }
      }
      state.cartQuantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
  },
  extraReducers: {},
});

export const {
  addProduct,
  addCartQuantity,
  reduceCartQuantity,
  removeCartItem,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
