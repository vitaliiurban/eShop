import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartState,
  CartItem,
  deleteFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

import "./_cart.scss";
import Quantity from "../Product/Quantity/Quantity";

function Cart() {
  const dispatch = useDispatch();

  const cartList: CartState = useSelector((state: RootState) => state.cart);

  const deleteProduct = (product: CartItem) => {
    dispatch(deleteFromCart(product));
  };
  const deleteAll = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="cart-container">
        <div className="cart-products">
          {cartList?.map((item) => {
            const { product, quantity } = item;
            return (
              <div className="cart-product" key={product.id}>
                <div className="cart-product-img-container">
                  <img
                    className="cart-product-img"
                    src={product.images[0]}
                  ></img>
                </div>
                <div className="cart-product">{product.title}</div>
                <div>{product.price + " $"}</div>
                <h1>{quantity}</h1>
                <Quantity
                  product={product}
                  quantity={quantity}
                  toggleCart={true}
                  componentName="Cart"
                />
                <div
                  onClick={() => {
                    deleteProduct(item);
                  }}
                >
                  Delete
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-checkout"></div>
      </div>
      <button onClick={() => deleteAll()}>Delete all product</button>
    </div>
  );
}

export default Cart;
