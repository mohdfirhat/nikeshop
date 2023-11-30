import CategoryItem from "./CategoryItem";
import { categoryItemModel } from "../model/model";

const categoryData: categoryItemModel[] = [
  {
    id: 1,
    desc: "Mens Category",
    url: "https://static.nike.com/a/images/t_prod/w_1536,c_limit/3de1aac6-ff9b-40df-aca0-407857781bb8/pdp.jpg",
    cat: "men",
  },
  {
    id: 2,
    desc: "Womans Category",
    url: "https://img.buzzfeed.com/buzzfeed-static/static/2020-05/15/13/asset/5ddd925391f1/sub-buzz-872-1589548499-9.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
    cat: "women",
  },
  {
    id: 3,
    desc: "Kids Category",
    url: "https://thumbs.dreamstime.com/b/model-walks-runway-nike-levi-s-kids-fashion-show-mercedes-benz-fashion-week-fall-new-york-ny-february-51215011.jpg",
    cat: "kids",
  },
];

const Categories: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold pl-8 pt-6">Categories</h2>
      <div className="md:flex">
        {categoryData.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
