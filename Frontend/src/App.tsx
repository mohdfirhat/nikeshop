import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
