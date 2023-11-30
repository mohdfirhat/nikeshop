import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/products/:category" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
