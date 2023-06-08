import { ProductModule } from "../../models/products.model";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useUpdateProductMutation } from "../../redux/productsApi";

import "./_product.scss";
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

  const [mainImage, setMainImage] = useState<string>(
    props.toggleProduct.images[0]
  );
  const [primaryImages, setPrimaryImages] = useState<string[]>([
    props.toggleProduct.images[1],
    props.toggleProduct.images[2],
  ]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleImage = (image: string, number: number) => {
    const updatedPrimaryImage = [...primaryImages];
    updatedPrimaryImage[number] = mainImage;
    console.log(updatedPrimaryImage);
    setMainImage(image);
    setPrimaryImages(updatedPrimaryImage);
  };

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
    <div className="product-container">
      <div className="breadcrumb">
        {props.toggleProduct.category.charAt(0).toUpperCase() +
          props.toggleProduct.category.slice(1) +
          ` / ` +
          props.toggleProduct.title}
      </div>
      <div className="product">
        <div className="product-image">
          <div className="product-image-container-main">
            <img className="product-image-main" src={mainImage}></img>
          </div>
          <div className="product-image-container-primary-all">
            {primaryImages.map((primaryImage, index: number) => {
              return (
                <div
                  onClick={() => handleImage(primaryImage, index)}
                  className="product-image-container-primary-one"
                  key={index}
                >
                  <img
                    className="product-image-primary"
                    src={primaryImage}
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className="product-info">
          <div className="product-info-title">{props.toggleProduct.title}</div>
          <div className="product-info-description">
            {props.toggleProduct.description}
          </div>
          <div className="product-info-price">
            {props.toggleProduct.price * quantity + ` $`}
          </div>
          <div className="product-info-quantity">
            <div
              onClick={() =>
                setQuantity(quantity === 1 ? quantity : quantity - 1)
              }
              className="product-info-quantity-minus"
            >
              -
            </div>
            <div className="product-info-quantity-number">{quantity}</div>
            <div
              onClick={() => setQuantity(quantity + 1)}
              className="product-info-quantity-plus"
            >
              +
            </div>
          </div>
          <button onClick={() => toggleProductCart(props.toggleProduct)}>
            {toggleCart ? "Delete from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
