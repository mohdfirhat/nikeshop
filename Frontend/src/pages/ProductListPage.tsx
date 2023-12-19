import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import { titleCase } from "../util/titleCase";

const ProductListPage: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  return (
    <>
      <h2 className=" text-4xl font-bold pt-8 pl-8">{titleCase(category)}</h2>
      <Products category={category} />
    </>
  );
};

export default ProductListPage;
