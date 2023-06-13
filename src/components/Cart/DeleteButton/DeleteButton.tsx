import { useDispatch } from "react-redux";
import { CartItem, deleteFromCart, clearCart } from "../../../redux/cartSlice";

import "./_deletebutton.scss";
import DeleteIcon from "./DeleteIcon/DeleteIcon";

interface DeleteButtonProps {
  choice: string;
  product?: CartItem;
}

function DeleteButton({ choice, product }: DeleteButtonProps) {
  const dispatch = useDispatch();
  const deleteProduct = (product: CartItem | undefined) => {
    if (product) dispatch(deleteFromCart(product));
  };
  const deleteAll = () => {
    console.log();
    dispatch(clearCart());
  };
  return (
    <div
      onClick={() => (choice === "all" ? deleteAll() : deleteProduct(product))}
      className={`cart-delete-button ${choice === "all" ? "all" : "one"}`}
    >
      {choice === "all" ? (
        <div
          onClick={() =>
            choice === "all" ? deleteAll() : deleteProduct(product)
          }
          className={`cart-delete-button ${choice === "all" ? "all" : "one"}`}
        >
          <div className="cart-delete-button-title">Delete all</div>
          <DeleteIcon />
        </div>
      ) : (
        <DeleteIcon />
      )}
    </div>
  );
}

export default DeleteButton;
