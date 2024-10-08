import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Separator } from "./components/ui/separator";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./components/products/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";

function App() {
  const location = useLocation();

  const pagesWithoutHeader = [
    "/login",
    "/admin/products",
    "/admin/products/create",
  ];
  const showHeader = !pagesWithoutHeader.includes(location.pathname);
  return (
    <>
      {showHeader ? (
        <>
          <Header />
          <Separator />
        </>
      ) : null}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />

        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>
        <Route path={"*"} Component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
