import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductModule } from "../../models/products.model";
import { CartState, deleteFromCart, clearCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

function Cart() {
  const dispatch = useDispatch();

  const cartList: CartState = useSelector((state: RootState) => state.cart);

  const deleteProduct = (product: ProductModule) => {
    dispatch(deleteFromCart(product));
  };
  const deleteAll = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div>
      <div>Cart</div>
      {cartList?.map((product) => {
        return (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>{product.price + " $"}</div>
            <img style={{ width: "100px" }} src={product.images[0]}></img>
            <button
              onClick={() => {
                deleteProduct(product);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button onClick={() => deleteAll()}>Delete all product</button>
    </div>
  );
}

export default Cart;
