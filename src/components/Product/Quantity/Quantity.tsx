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
    if (componentName === "Cart") {
      handleQuantityChange(type, product, quantity);
    }
    if (componentName === "Product" && !toggleCart) {
      handleProductQuantityChange(type);
    }
  };

  const handleQuantityChange = (
    type: string,
    product: ProductModule,
    quantity: number
  ) => {
    console.log(product);
    console.log(quantity);
    let newQuantity = quantity;
    if (type === "-") {
      if (newQuantity > 1) {
        newQuantity -= 1;
      }
    } else if (type === "+") {
      newQuantity += 1;
    }
    dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
    quantity = newQuantity;
  };

  const handleProductQuantityChange = (type: string) => {
    if (type === "-") {
      setQuantity && setQuantity(quantity > 1 ? quantity - 1 : quantity);
    }
    if (type === "+") {
      setQuantity && setQuantity(quantity + 1);
    }
  };

  return (
    <div
      className={`${componentName === "Cart" ? "cart" : "product"}-quantity ${
        componentName === "Product" && toggleCart ? "inactive" : "active"
      }`}
    >
      <div
        onClick={() => changeQuantity("-", product, quantity)}
        className={`${
          componentName === "Cart" ? "cart" : "product"
        }-quantity-minus ${toggleCart ? "inactive" : "active"}`}
      >
        -
      </div>
      <div
        className={`${
          componentName === "Cart" ? "cart" : "product"
        }-quantity-number`}
      >
        {quantity}
      </div>
      <div
        onClick={() => changeQuantity("+", product, quantity)}
        className={`${
          componentName === "Cart" ? "cart" : "product"
        }-quantity-plus ${toggleCart ? "inactive" : "active"}`}
      >
        +
      </div>
    </div>
  );
}

export default Quantity;
