import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductDescriptionModel } from "../model/model";
import { publicRequest } from "../requestMethods";

type Props = {
  category: string;
};
//TODO: Make sure process.env is working and remove hardcorded value
const Products: React.FC<Props> = ({ category }) => {
  // const baseUrl = "http://localhost:3000/api";

  const [products, setProducts] = useState<
    ProductDescriptionModel[] | undefined
  >(undefined);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          category ? `/products?categories=${category}` : "/products"
        );
        console.log(res);
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
    console.log(products);
  }, []);

  return (
    <>
      <div className="sm:flex">
        {products?.map((item) => <Product item={item} key={item.id} />)}
      </div>
    </>
  );
};

export default Products;
