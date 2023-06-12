import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CategoriesModule, ProductModule } from "../../models/products.model";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Products from "../Products/Products";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import Wish from "../Wishlist/Wish";

function App() {
  // const [toggleCategory, setToggleCategory] = useState<string>("");
  const [toggleCategory, setToggleCategory] = useState<string>(() => {
    return localStorage.getItem("toggleCategory") || "";
  });
  const [toggleProduct, setToggleProduct] = useState<ProductModule | undefined>(
    undefined
  );
  // const [toggleProduct, setToggleProduct] = useState<ProductModule | undefined>(
  //   () => {
  //     const storedProduct = localStorage.getItem("toggleProduct");
  //     if (storedProduct) {
  //       return JSON.parse(storedProduct);
  //     }
  //     return undefined;
  //   }
  // );

  const handleClick = (category: CategoriesModule): void => {
    setToggleCategory(category.toString());
  };
  useEffect(() => {
    localStorage.setItem("toggleCategory", toggleCategory);
  }, [toggleCategory]);

  // useEffect(() => {
  //   if (toggleProduct) {
  //     localStorage.setItem("toggleProduct", JSON.stringify(toggleProduct));
  //   }
  // }, [toggleProduct]);

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
          path={`/categories/${toggleCategory}/:id`}
          element={<Product />}
        />
        <Route path={`/cart`} element={<Cart />}></Route>
        <Route path={`/wish`} element={<Wish />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
