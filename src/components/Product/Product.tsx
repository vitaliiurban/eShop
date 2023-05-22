import { ProductModule } from "../../models/products.model";
import { useEffect } from "react";
interface ProductProps {
  toggleProduct: ProductModule;
}
function Product(props: ProductProps) {
  useEffect(() => {
    localStorage.setItem("toggleProduct", JSON.stringify(props.toggleProduct));
  }, [props.toggleProduct]);

  return (
    <div>
      <div>{props.toggleProduct.id}</div>
      <div>{props.toggleProduct.title}</div>
      <div>{props.toggleProduct.description}</div>
      <div>{props.toggleProduct.price}</div>
      <img src={props.toggleProduct.images[0]}></img>
      <img src={props.toggleProduct.images[1]}></img>
      <img src={props.toggleProduct.images[2]}></img>
      <div>{props.toggleProduct.category}</div>
    </div>
  );
}

export default Product;
