import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductModel } from "../model/model";
import { ProductData } from "../data/data";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ProductPage: React.FC = () => {
  const location = useLocation();
  const id: number = Number(location.pathname.split("/")[2]);
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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
          <div className="flex justify-around my-10">
            <button className="btn">Add to Cart</button>
            <button className="btn btn-primary flex-1 ml-4">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
