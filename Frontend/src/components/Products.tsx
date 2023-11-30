import { useLocation } from "react-router-dom";
import { ProductData as ProdData } from "../data/data";
import Product from "./Product";
import { titleCase } from "../util/titleCase";

const Products: React.FC = () => {
  const location = useLocation();
  const categoryName = location.pathname.split("/")[2];
  const ProductData = ProdData.filter((prod) =>
    prod.cat.includes(categoryName)
  );

  return (
    <>
      <h2 className=" text-4xl font-bold pt-8 pl-8">
        {titleCase(categoryName)}
      </h2>

      <div className="sm:flex flex-wrap">
        {ProductData.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Products;
