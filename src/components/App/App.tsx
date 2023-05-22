import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CategoriesModule, ProductModule } from "../../models/products.model";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Products from "../Products/Products";
import Product from "../Product/Product";

function App() {
  const [toggleCategory, setToggleCategory] = useState<string>(() => {
    return localStorage.getItem("toggleCategory") || "";
  });
  const [toggleProduct, setToggleProduct] = useState<ProductModule | undefined>(
    () => {
      const storedProduct = localStorage.getItem("toggleProduct");
      return storedProduct ? JSON.parse(storedProduct) : undefined;
    }
  );

  const handleClick = (category: CategoriesModule): void => {
    setToggleCategory(category.toString());
  };

  return (
    <BrowserRouter>
      <Header setToggleCategory={setToggleCategory} onClick={handleClick} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={
            toggleCategory === "all categories"
              ? `/categories`
              : `/categories/${toggleCategory}`
          }
          element={
            <Products
              toggleCategory={toggleCategory}
              setToggleProduct={setToggleProduct}
            />
          }
        />
        <Route
          path={`/categories/${toggleCategory}/${toggleProduct?.title.replace(
            /\s+/g,
            ""
          )}`}
          element={toggleProduct && <Product toggleProduct={toggleProduct} />}
        />
        <Route path={`/cart`}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
