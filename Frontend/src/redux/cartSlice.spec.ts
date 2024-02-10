import cartReducer, {
  CartState,
  addCartQuantity,
  reduceCartQuantity,
  ProductCartModel,
  removeCartItem,
  addProduct,
} from "./cartSlice";

describe("cart reducer", () => {
  const initialState: CartState = {
    products: [],
    cartQuantity: 0,
    totalCost: 0,
  };

  //start state has product with id 1 with 3 quantity
  const startState: CartState = {
    products: [],
    cartQuantity: 0,
    totalCost: 0,
  };

  const cartItem: ProductCartModel = {
    id: 1,
    name: "Nike Dri-FIT Team (MLB Minnesota Twins)",
    shortDesc: "Men's Long-Sleeve T-Shirt",
    description: "description1",
    categories: ["men", "t-shirt"],
    urls: [
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/0116e668-a77e-402d-b89f-04647db0f0ad/dri-fit-team-minnesota-twins-mens-long-sleeve-t-shirt-6Wdjql.png",
    ],
    rating: 3.5,
    price: 40,
    products: [
      {
        id: 5,
        productDescriptionId: 1,
        stock: 20,
        size: "M",
        color: "Dark Blue",
        createdAt: "2024-01-16T02:44:06.715Z",
        updatedAt: "2024-01-16T02:44:06.715Z",
      },
    ],
    quantity: 3,
  };

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      products: [],
      cartQuantity: 0,
      total: 0,
    });
  });

  it("should handle increment", () => {
    const actual = cartReducer(startState, addCartQuantity(cartItem));
    expect(actual.products[0].quantity).toEqual(4);
  });
  it("should handle decrease", () => {
    const actual = cartReducer(startState, reduceCartQuantity(cartItem));
    expect(actual.products[0].quantity).toEqual(2);
  });

  it("should remove item from cart", () => {
    const actual = cartReducer(startState, removeCartItem(cartItem));
    expect(actual).toEqual(initialState);
  });
  it("should add item from cart", () => {
    const actual = cartReducer(initialState, addProduct(cartItem));
    expect(actual).toEqual(startState);
  });
});
