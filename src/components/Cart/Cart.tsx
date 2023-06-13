import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CartState } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

import "./_cart.scss";
import Quantity from "../Product/Quantity/Quantity";
import DeleteButton from "./DeleteButton/DeleteButton";
import CartIcon from "../Header/CartIcon/CartIcon";

function Cart() {
  const cartList: CartState = useSelector((state: RootState) => state.cart);
  let totalPrice = 0;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      {cartList.length ? (
        <div className="cart-container">
          <div className="cart-products">
            <div className="cart-info">
              <div className="cart-info-product">Product</div>
              <div className="cart-info-quantity">Quantity</div>
              <div className="cart-info-price">Price</div>
            </div>
            {cartList?.map((item) => {
              const { product, quantity } = item;
              totalPrice += product.price * quantity;
              return (
                <div className="cart-product" key={product.id}>
                  <div className="cart-product-img-container">
                    <img className="cart-product-img" src={product.images[0]} />
                  </div>
                  <div className="cart-product-title">{product.title}</div>
                  <div className="cart-product-quantity">
                    <Quantity
                      product={product}
                      quantity={quantity}
                      toggleCart={true}
                      componentName="Cart"
                    />
                    <DeleteButton choice={"one"} product={item} />
                  </div>
                  <div className="cart-product-price">
                    {product.price * quantity + " $"}
                  </div>
                </div>
              );
            })}
            <DeleteButton choice={"all"} />
          </div>
          <div className="cart-checkout">
            <div className="cart-checkout-subtotal">
              <div className="cart-checkout-subtotal-title">Subtotal</div>
              <div className="cart-checkout-subtotal-number">
                {totalPrice + " $"}
              </div>
            </div>
            <div className="cart-checkout-discount">
              <div className="cart-checkout-discount-title">Discount</div>
              <div className="cart-checkout-discount-number">{0 + " $"}</div>
            </div>
            <div className="cart-line"></div>
            <div className="cart-checkout-grand">
              <div className="cart-checkout-grand-title">Grand total</div>
              <div className="cart-checkout-grand-number">
                {totalPrice + " $"}
              </div>
            </div>
            <div className="cart-checkout-button-now">Checkout now</div>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <CartIcon className={"cart"} />
          </div>
          <div className="cart-empty-title">Your cart is empty</div>
        </div>
      )}
    </div>
  );
}

export default Cart;
