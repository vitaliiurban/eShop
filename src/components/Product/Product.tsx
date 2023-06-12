import { ProductModule } from "../../models/products.model";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  CartState,
  CartItem,
  addToCart,
  deleteFromCart,
} from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useGetProductQuery } from "../../redux/productsApi";
import { WishState, addToWish, deleteFromWish } from "../../redux/wishSlice";

import "./_product.scss";

import Heart from "../Wishlist/Heart/Heart";
import Delivery from "./Delivery/Delivery";
import Quantity from "./Quantity/Quantity";

function Product() {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const id = path.substring(path.lastIndexOf("/") + 1);
  const productId = Number(id);
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetProductQuery(productId);
  const product = data as ProductModule | undefined;
  const cartList: CartState = useSelector((state: RootState) => state.cart);
  const cartItem = cartList.find((item: CartItem) => item.product === product);

  const [quantity, setQuantity] = useState<number>(cartItem?.quantity || 1);
  const wishList: WishState = useSelector((state: RootState) => state.wish);
  const [toggleCart, setToggleCart] = useState<boolean>(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart: CartState = storedCart ? JSON.parse(storedCart) : [];
    return parsedCart.some((item) => item.product.id === product?.id);
  });

  const [mainImage, setMainImage] = useState<string>(product?.images[0] || "");
  const [primaryImages, setPrimaryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [toggleWish, setToggleWish] = useState<boolean>(
    wishList.some((item) => item.id === product?.id)
  );

  const toggleProductCart = (product: ProductModule) => {
    if (!toggleCart) {
      dispatch(addToCart({ product, quantity }));
      setToggleCart(true);
    } else {
      dispatch(deleteFromCart({ product, quantity }));
      setToggleCart(false);
    }
  };

  const handleImage = (image: string, index: number) => {
    setMainImage(image);
    setCurrentIndex(index);
  };
  const handleArrowLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleArrowRight = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleWish = () => {
    dispatch(
      !toggleWish
        ? addToWish(product as ProductModule)
        : deleteFromWish(product as ProductModule)
    );
    setToggleWish(!toggleWish);
  };

  useEffect(() => {
    setToggleWish(wishList.some((item) => item.id === product?.id));
  }, [wishList, product]);

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    setToggleCart(cartList.some((item) => item.product.id === product?.id));
  }, [cartList, product]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0] || "");
      setPrimaryImages([
        product.images[0],
        product.images[1],
        product.images[2],
      ]);
    }
  }, [product]);

  useEffect(() => {
    setMainImage(product?.images[currentIndex] || "");
  }, [currentIndex]);

  return (
    <div className="product-container">
      {product && (
        <div className="breadcrumb">
          <div className="breadcrumb-category">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </div>
          <div>{"/"}</div>
          <div className="breadcrumb-title">{product.title}</div>
        </div>
      )}
      <div className="product">
        <div className="product-image">
          <div className="product-image-container-main">
            <Heart toggleWish={toggleWish} onClick={() => handleWish()} />
            <div
              onClick={() => handleArrowLeft()}
              className="product-arrow-container"
            >
              <div
                className={`product-arrow ${
                  currentIndex > 0 ? "active" : "inactive"
                }`}
              >
                {"<"}
              </div>
            </div>
            <div className="product-image-main-container">
              <img className="product-image-main" src={mainImage}></img>
            </div>
            <div
              onClick={() => handleArrowRight()}
              className="product-arrow-container"
            >
              <div
                className={`product-arrow ${
                  currentIndex < 2 ? "active" : "inactive"
                }`}
              >
                {">"}
              </div>
            </div>
          </div>
          <div className="product-image-container-primary-all">
            {primaryImages?.map((primaryImage, index: number) => {
              return (
                <div
                  onClick={() => handleImage(primaryImage, index)}
                  className={`product-image-container-primary-one ${
                    primaryImage === mainImage ? "active" : "inactive"
                  }`}
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
        {product && (
          <div className="product-info">
            <div className="product-info-title">{product.title}</div>
            <div className="product-info-description">
              {product.description}
            </div>
            <div className="line"></div>
            <div className="product-info-price">
              {product.price * quantity + ` $`}
            </div>
            <Quantity
              product={product}
              quantity={quantity}
              toggleCart={toggleCart}
              setQuantity={setQuantity}
              componentName="Product"
            />
            <div className="line"></div>
            <div className="product-buttons">
              <div
                className="product-button buynow"
                onClick={() => console.log("buy now")}
              >
                {"Buy now"}
              </div>
              <div
                className={`product-button ${toggleCart ? "del" : "add"}`}
                onClick={() => toggleProductCart(product)}
              >
                {toggleCart ? "Delete from Cart" : "Add to Cart"}
              </div>
            </div>
            <Delivery />
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
