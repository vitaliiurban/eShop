import { ProductModule } from "../../models/products.model";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useUpdateProductMutation } from "../../redux/productsApi";

export interface ProductProps {
  toggleProduct: ProductModule;
}

function Product(props: ProductProps) {
  const dispatch = useDispatch();
  const [mutate] = useUpdateProductMutation();
  const [toggleCart, setToggleCart] = useState<boolean>(() => {
    const storedProduct = localStorage.getItem("product");
    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);
      if (parsedProduct.id === props.toggleProduct.id) {
        return parsedProduct.cart;
      }
    }
    return props.toggleProduct.cart;
  });

  const toggleProductCart = (product: ProductModule) => {
    if (!toggleCart) {
      dispatch(addToCart(product));
      mutate({ ...product, cart: true });
      setToggleCart(true);
    } else {
      dispatch(deleteFromCart(product));
      mutate({ ...product, cart: false });
      setToggleCart(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(props.toggleProduct));
  }, [toggleCart]);

  return (
    <div>
      <button onClick={() => toggleProductCart(props.toggleProduct)}>
        {toggleCart ? "Delete from Cart" : "Add to Cart"}
      </button>
      <div>
        <div>{props.toggleProduct.id}</div>
        <div>{props.toggleProduct.title}</div>
        <div>{props.toggleProduct.description}</div>
        <div>{props.toggleProduct.price}</div>
        <img
          style={{ width: "100px" }}
          src={props.toggleProduct.images[0]}
        ></img>
        <img
          style={{ width: "100px" }}
          src={props.toggleProduct.images[1]}
        ></img>
        <img
          style={{ width: "100px" }}
          src={props.toggleProduct.images[2]}
        ></img>
        <div>{props.toggleProduct.category}</div>
      </div>
    </div>
  );
}

export default Product;
