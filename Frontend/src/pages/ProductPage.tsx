import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductModel } from "../model/model";
import { ProductData } from "../data/data";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../hooks/hooks";
import { addProduct } from "../redux/cartSlice";

const ProductPage: React.FC = () => {
  const location = useLocation();
  const id: number = Number(location.pathname.split("/")[2]);
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const handleClick = () => {
    dispatch(addProduct({ ...product, color, size, quantity }));
  };

  const fetchedData: ProductModel = ProductData.filter(
    (prod) => prod.id === id
  )[0];
  useEffect(() => setProduct(fetchedData), []);
  console.log(product);

  return (
    <>
      <div className="md:flex justify-around items-center">
        <img
          className="w-[95vw] h-[70vh] object-top object-cover md:w-[40vw] rounded"
          src={product?.url}
          alt={product?.name}
        />
        <div>
          <div className="flex justify-between items-center md:block p-5">
            <div>
              <h2 className="font-bold">{product?.name}</h2>
              <p>{product?.shortDesc}</p>
            </div>
            <div>
              <p className="mr-10 text-2xl md:flex p-4 justify-end">{`$${product?.price}`}</p>
            </div>
          </div>
          <div className="flex justify-around">
            <div>
              <label className="mr-2">Size:</label>
              <select
                className="select"
                name="sizes"
                id="sizes"
                onChange={(e) => setSize(e.target.value)}>
                <option value=""></option>
                {product?.sizes.map((size) => (
                  <option value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mr-2">Color:</label>
              <select
                className="select"
                name="colors"
                id="colors"
                onChange={(e) => setColor(e.target.value)}>
                <option value=""></option>
                {product?.colors.map((color) => (
                  <option value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-around items-center my-4">
            <button
              className="btn"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}>
              <RemoveIcon />
            </button>
            <p>{quantity}</p>
            <button className="btn" onClick={() => setQuantity(quantity + 1)}>
              <AddIcon />
            </button>
          </div>
          <div className="flex justify-center py-10">
            <button className="btn btn-primary w-[90%]" onClick={handleClick}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
