import { Link } from "react-router-dom";
import { categoryItemModel } from "../model/model";

type Props = {
  item: categoryItemModel;
};

const CategoryItem = ({ item }: Props) => {
  return (
    <div className="relative  h-[80vh] my-4 mx-auto md:min-w-[30%] p-1">
      <Link to={`/products/${item.cat}`}>
        <img
          className="w-full h-full object-cover object-top rounded-lg"
          src={item.url}
          alt={item.desc}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h3 className="p-2 rounded text-4xl font-bold bg-white bg-opacity-50">
            {item.desc}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
