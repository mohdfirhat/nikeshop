import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDescriptionModel, ProductModel } from "../model/model";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../app/hooks";
import { addProduct } from "../redux/cartSlice";
import { titleCase } from "../util/titleCase";
import { publicRequest } from "../requestMethods";

const ProductPage: React.FC = () => {
  const location = useLocation();
  const id: string = location.pathname.split("/")[2];
  const dispatch = useAppDispatch();
  // const baseUrl = "http://localhost:3000/api";

  const [productDescription, setProductDescription] =
    useState<ProductDescriptionModel | null>(null);
  const [products, setProducts] = useState<ProductModel[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    ProductModel[] | null
  >(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const cartProduct = {
      ...productDescription!,
      products: filteredProducts!,
      quantity,
    };
    dispatch(addProduct(cartProduct));
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`);
        console.log(res.data);
        const { data } = res;
        const { products } = data;
        const { [products]: removedKey, ...productDescription } = data;
        setProductDescription(productDescription);
        setProducts(products);
        setFilteredProducts(products);
      } catch (err) {}
    };
    getProductById();
    console.log(productDescription);
    console.log(products);
  }, []);

  useEffect(() => {
    if (!color && !size) {
      setFilteredProducts(products);
    } else if (color && !size) {
      setFilteredProducts(
        products!.filter((product) => product.color === color)
      );
    } else if (!color && size) {
      setFilteredProducts(products!.filter((product) => product.size === size));
    } else {
      setFilteredProducts(
        products!.filter(
          (product) => product.size === size && product.color === color
        )
      );
    }
  }, [color, size]);

  useEffect(() => {
    const sizes: string[] = [];
    filteredProducts?.map((product) => sizes.push(product.size));
    setFilteredSizes([...new Set(sizes)]);
    const colors: string[] = [];
    filteredProducts?.map((product) => colors.push(product.color));
    setFilteredColors([...new Set(colors)]);
  }, [filteredProducts]);

  return (
    <>
      <div className="md:flex justify-around items-center">
        <img
          className="w-[95vw] h-[70vh] object-top object-cover md:w-[40vw] rounded"
          src={productDescription?.urls[0]}
          alt={productDescription?.name}
        />
        <div>
          <div className="flex justify-between items-center md:block p-5">
            <div>
              <h2 className="font-bold">{productDescription?.name}</h2>
              <p>{productDescription?.shortDesc}</p>
            </div>
            <div>
              <p className="mr-10 text-2xl md:flex p-4 justify-end">{`$${productDescription?.price}`}</p>
            </div>
          </div>
          <form onSubmit={handleClick}>
            <div className="flex justify-around">
              <div>
                <label className="mr-2">Size:</label>
                <select
                  className="select"
                  name="sizes"
                  id="sizes"
                  onChange={(e) => setSize(e.target.value)}
                  onClick={() => {
                    const select_box: HTMLSelectElement | HTMLElement | null =
                      document.getElementById("sizes");
                    if (select_box instanceof HTMLSelectElement) {
                      select_box!.selectedIndex = 0;
                      setSize("");
                    }
                  }}
                  required>
                  <option value=""></option>
                  {filteredSizes?.map((size) => (
                    <option value={size} key={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mr-2">Color:</label>
                <select
                  className="select"
                  name="colors"
                  id="colors"
                  onChange={(e) => setColor(e.target.value)}
                  onClick={() => {
                    const select_box: HTMLSelectElement | HTMLElement | null =
                      document.getElementById("colors");
                    if (select_box instanceof HTMLSelectElement) {
                      select_box!.selectedIndex = 0;
                      setColor("");
                    }
                  }}
                  required>
                  <option value=""> </option>
                  {filteredColors?.map((color) => (
                    <option value={color} key={color}>
                      {titleCase(color)}
                    </option>
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
              <button type="submit" className="btn btn-primary w-[90%]">
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
