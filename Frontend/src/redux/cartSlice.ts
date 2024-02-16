import { createSlice } from "@reduxjs/toolkit";
import { ProductsWithDescriptionModel } from "../model/model";
import { RootState } from "../app/store";

export type ProductCartModel = ProductsWithDescriptionModel & {
  quantity: number;
};

export type CartState = {
  products: ProductCartModel[];
  cartQuantity: number;
  totalCost: number;
};

const initialState: CartState = {
  products: [],
  cartQuantity: 0,
  totalCost: 0,
};
type productCartActionModel = {
  payload: ProductCartModel;
  type: string;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: productCartActionModel) => {
      let find = state.products.findIndex(
        (item) =>
          //combine if same id,size,color else create new cart product
          item.products[0].id === action.payload.products[0].id &&
          item.products[0].size === action.payload.products[0].size &&
          item.products[0].color === action.payload.products[0].color
      );
      if (find >= 0) {
        state.products[find].quantity += action.payload.quantity;
        state.totalCost += action.payload.price * action.payload.quantity;
      } else {
        state.cartQuantity += 1;
        state.products.push(action.payload);
        state.totalCost += action.payload.price * action.payload.quantity;
      }
    },
    addCartQuantity: (state, action: productCartActionModel) => {
      const addIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.products[0].id === action.payload.products[0].id &&
          item.products[0].size === action.payload.products[0].size &&
          item.products[0].color === action.payload.products[0].color
      );
      if (addIndex >= 0) {
        state.products[addIndex].quantity += 1;
      }
      state.totalCost += action.payload.price;
    },
    reduceCartQuantity: (state, action: productCartActionModel) => {
      const reduceIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.products[0].id === action.payload.products[0].id &&
          item.products[0].size === action.payload.products[0].size &&
          item.products[0].color === action.payload.products[0].color
      );
      if (reduceIndex >= 0) {
        state.products[reduceIndex].quantity -= 1;
      }
      state.totalCost -= action.payload.price;
    },
    removeCartItem: (state, action: productCartActionModel) => {
      const deleteIndex = state.products.findIndex(
        (item) =>
          //find product to delete
          item.products[0].id === action.payload.products[0].id &&
          item.products[0].size === action.payload.products[0].size &&
          item.products[0].color === action.payload.products[0].color
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
      state.totalCost -= action.payload.price * action.payload.quantity;
    },
  },
});

export const {
  addProduct,
  addCartQuantity,
  reduceCartQuantity,
  removeCartItem,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
