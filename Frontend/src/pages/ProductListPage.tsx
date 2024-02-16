import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { titleCase } from "../util/titleCase";

const ProductListPage: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const category = location.search.split("=")[1];
  console.log(category);
  return (
    <>
      <h2 className=" text-4xl font-bold pt-8 pl-8">
        {category ? titleCase(category) : "Products"}
      </h2>
      <Products category={category} />
    </>
  );
};

export default ProductListPage;
