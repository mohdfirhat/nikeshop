import CartCard from "../components/CartCard";
import { useAppSelector } from "../hooks/hooks";
import { selectCart } from "../redux/cartSlice";

const CartPage = () => {
  const cart = useAppSelector(selectCart);
  return (
    <div>
      <h1 className=" text-3xl pl-4 py-4 font-bold">Cart</h1>
      <div>
        {cart.products.map((item) => (
          <CartCard item={item} key={`${item.id}${item.size}${item.color}`} />
        ))}
      </div>
    </div>
  );
};

export default CartPage;
