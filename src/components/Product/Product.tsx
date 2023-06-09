import { ProductModule } from "../../models/products.model";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CartState, addToCart, deleteFromCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useGetProductQuery } from "../../redux/productsApi";
import "./_product.scss";

function Product() {
  const path = window.location.pathname;
  const id = path.substring(path.lastIndexOf("/") + 1);
  console.log(id);
  const productId = Number(id);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetProductQuery(productId);
  const product = data as ProductModule | undefined;
  const cartList: CartState = useSelector((state: RootState) => state.cart);
  const [toggleCart, setToggleCart] = useState<boolean>(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart: CartState = storedCart ? JSON.parse(storedCart) : [];
    return parsedCart.some((p) => p.id === product?.id);
  });

  const [mainImage, setMainImage] = useState<string>(product?.images[0] || "");
  const [primaryImages, setPrimaryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  console.log("index", currentIndex);
  const toggleProductCart = (product: ProductModule) => {
    if (!toggleCart) {
      dispatch(addToCart(product));
      setToggleCart(true);
    } else {
      dispatch(deleteFromCart(product));
      setToggleCart(false);
    }
  };

  useEffect(() => {
    setToggleCart(cartList.some((p) => p.id === product?.id));
  }, [cartList, product]);
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
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    setMainImage(product?.images[currentIndex] || "");
  }, [currentIndex]);

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
            <div className="delivery">
              <div className="delivery-container-free">
                <div className="delivery-free icon">icon</div>
                <div className="delivery-free">
                  <div className="delivery-free-title">Free Delivery</div>
                  <div>Enter your Postal code for Delivery Availability</div>
                </div>
              </div>
              <div className="delivery-container-return">
                <div className="delivery-return icon">icon</div>
                <div className="delivery-return">
                  <div className="delivery-return-title">Return Delivery</div>
                  <div>Free 30days Delivery Return. Details</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
