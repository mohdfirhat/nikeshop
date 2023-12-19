import {
  ProductCartModel,
  addCartQuantity,
  reduceCartQuantity,
  removeCartItem,
} from "../redux/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../app/hooks";

type Props = {
  item: ProductCartModel;
};

const CartCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="card card-side bg-base-100 shadow-xl my-3">
      <figure className="w-[30%]">
        <img className="" src={item.urls[0]} alt={item.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.shortDesc}</p>
        <p>{`$${item.price * item.quantity}`}</p>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <div className="card-actions justify-around items-center">
          <button
            className="btn"
            onClick={() => dispatch(reduceCartQuantity(item))}
            disabled={item.quantity <= 1}>
            <RemoveIcon />
          </button>
          <p className=" text-center">{item.quantity}</p>
          <button
            className="btn"
            onClick={() => dispatch(addCartQuantity(item))}>
            <AddIcon />
          </button>
        </div>
        <div className="card-actions">
          <button
            className="btn"
            onClick={() => dispatch(removeCartItem(item))}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
