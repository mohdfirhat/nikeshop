import { ShoppingCartOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className=" h-16">
      <div className="flex justify-between items-center fixed inset-x-0 top-0 z-10 bg-white shadow">
        <div className="c-left">
          <Link to="/">
            <span className="text-2xl px-4 font-logo font-extrabold">Nike</span>
          </Link>
        </div>
        <div className="c-middle px-4">
          <img
            className="hidden h-14 mix-blend-multiply md:block"
            src="/public/nike_logo.jpeg"
            alt="nike logo"
          />
        </div>
        <div className="c-right">
          <ul className="flex items-center px-4">
            <li className="m-2 relative">
              <input
                type="text"
                placeholder="Search Products"
                className="input input-bordered w-full min-w-[145px] max-w-xs text-sm p-2"
              />

              <SearchIcon className="absolute top-3 right-2 bg-white" />
            </li>
            <li className="p-2">
              <Link to="/login">Login</Link>
            </li>
            <li className="p-2">
              <Link to="/cart">
                <ShoppingCartOutlined />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
