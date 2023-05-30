import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductModule } from "../../models/products.model";
import { CartState, deleteFromCart, clearCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useUpdateProductMutation } from "../../redux/productsApi";

function Cart() {
  const dispatch = useDispatch();
  const [mutate] = useUpdateProductMutation();

  const cartList: CartState = useSelector((state: RootState) => state.cart);

  const deleteProduct = (product: ProductModule) => {
    dispatch(deleteFromCart(product));
    mutate({ ...product, cart: false });
  };
  const deleteAll = () => {
    dispatch(clearCart());
    cartList.map((product) => {
      mutate({ ...product, cart: false });
    });
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
