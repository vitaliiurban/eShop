import { addToCart, deleteFromCart } from "../../../redux/cartSlice";
import { ProductModule } from "../../../models/products.model";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import "./_button.scss";
interface ButtonProps {
  product: ProductModule;
  quantity: number;
  title: string;
  className: string;
  toggleCart: boolean;
  setToggleCart?: Dispatch<SetStateAction<boolean>>;
}

function Button({
  product,
  quantity,
  title,
  className,
  toggleCart,
  setToggleCart,
}: ButtonProps) {
  const dispatch = useDispatch();
  const toggleProductCart = (
    product: ProductModule,
    quantity: number,
    toggleCart: boolean
  ) => {
    if (!toggleCart) {
      dispatch(addToCart({ product, quantity }));
      setToggleCart && setToggleCart(true);
    } else {
      dispatch(deleteFromCart({ product, quantity }));
      setToggleCart && setToggleCart(false);
    }
  };

  return (
    <div
      className={className}
      onClick={() => toggleProductCart(product, quantity, toggleCart)}
    >
      {title}
    </div>
  );
}

export default Button;
