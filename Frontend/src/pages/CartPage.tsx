import CartCard from "../components/CartCard";
import { useAppSelector } from "../app/hooks";
import { selectCart } from "../redux/cartSlice";
import { userRequest } from "../requestMethods";

const CartPage = () => {
  const cart = useAppSelector(selectCart);
  console.log(cart);

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { products, cartQuantity, totalCost } = cart;
      const res = await userRequest.post("/orders", {
        products,
        cartQuantity,
        totalCost,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className=" text-3xl pl-4 py-4 font-bold">Cart</h1>
      <div>
        {cart.products.map((item) => (
          <CartCard item={item} key={`${item.id}${item.size}${item.color}`} />
        ))}
      </div>
      <button className=" mx-auto w-[80vw] btn" onClick={handleClick}>
        Purchase
      </button>
    </div>
  );
};

export default CartPage;
