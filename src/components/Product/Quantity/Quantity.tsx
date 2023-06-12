import { Dispatch, SetStateAction } from "react";
import { ProductModule } from "../../../models/products.model";
import { updateQuantity } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import "./_quantity.scss";
interface QuantityProps {
  product: ProductModule;
  quantity: number;
  toggleCart?: boolean;
  setQuantity?: Dispatch<SetStateAction<number>>;
  componentName: string;
}

function Quantity({
  product,
  quantity,
  toggleCart,
  setQuantity,
  componentName,
}: QuantityProps) {
  const dispatch = useDispatch();

  const changeQuantity = (
    type: string,
    product: ProductModule,
    quantity: number
  ) => {
    console.log(toggleCart);
    if (componentName === "Cart") {
      handleQuantityChange(type, product, quantity);
    }
    if (componentName === "Product") {
      handleProductQuantityChange(type);
    }
  };

  const handleQuantityChange = (
    type: string,
    product: ProductModule,
    quantity: number
  ) => {
    let newQuantity = quantity;
    if (type === "-") {
      newQuantity -= 1;
    } else if (type === "+") {
      newQuantity += 1;
    }
    dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
  };

  const handleProductQuantityChange = (type: string) => {
    if (type === "-") {
      console.log(" setQuantity(quantity - 1)");
      setQuantity && setQuantity(quantity - 1);
    }
    if (type === "+") {
      console.log(" setQuantity(quantity + 1)");
      setQuantity && setQuantity(quantity + 1);
    }
  };

  return (
    <div className={`quantity ${toggleCart ? "inactive" : "active"}`}>
      <div
        onClick={() => changeQuantity("-", product, quantity)}
        className={`quantity-minus ${toggleCart ? "inactive" : "active"}`}
      >
        -
      </div>
      <div className={"quantity-number"}>{quantity}</div>
      <div
        onClick={() => changeQuantity("+", product, quantity)}
        className={`quantity-plus ${toggleCart ? "inactive" : "active"}`}
      >
        +
      </div>
    </div>
  );
}

export default Quantity;
