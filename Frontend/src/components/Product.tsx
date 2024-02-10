import { Link } from "react-router-dom";
import { ProductDescriptionModel } from "../model/model";

type Props = { item: ProductDescriptionModel };

const Product: React.FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <div className="card min-w-[300px] bg-base-100 shadow-xl m-2">
      <Link to={`/product/${item.id}`}>
        <figure>
          <img src={item.urls[0]} />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title font-bold">{item.name}</h2>
        <p>{item.shortDesc}</p>
        <p className="flex justify-end font-bold text-xl">{`$${item.price}`}</p>
      </div>
    </div>
  );
};

export default Product;
