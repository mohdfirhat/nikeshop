import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import { ProductModel } from "../model/model";

type Props = {
  category: string;
};
//TODO: Make sure process.env is working and remove hardcorded value
const Products: React.FC<Props> = ({ category }) => {
  const baseUrl = "http://localhost:3000/api";

  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `${baseUrl}/products?category=${category}`
            : `${baseUrl}/products`
        );
        console.log(res);
        setProducts(res.data);

        console.log(products);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const ProductData = products.filter((prod) =>
    prod.categories.includes(category)
  );

  return (
    <>
      <div className="sm:flex">
        {ProductData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Products;
