import { ProductModule } from "../../models/products.model";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CartState, addToCart, deleteFromCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import { useGetProductQuery } from "../../redux/productsApi";
import { useParams } from "react-router-dom";
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
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setToggleCart(cartList.some((p) => p.id === product?.id));
  }, [cartList, product]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0] || "");
      setPrimaryImages([product.images[1], product.images[2]]);
    }
  }, [product]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  const handleImage = (image: string, number: number) => {
    const updatedPrimaryImage = [...primaryImages];
    updatedPrimaryImage[number] = mainImage;
    setMainImage(image);
    setPrimaryImages(updatedPrimaryImage);
  };

  const toggleProductCart = (product: ProductModule) => {
    if (!toggleCart) {
      dispatch(addToCart(product));
      setToggleCart(true);
    } else {
      dispatch(deleteFromCart(product));
      setToggleCart(false);
    }
  };

  return (
    <div className="product-container">
      {product && (
        <div className="breadcrumb">
          {product.category.charAt(0).toUpperCase() +
            product.category.slice(1) +
            ` / ` +
            product.title}
        </div>
      )}
      <div className="product">
        <div className="product-image">
          <div className="product-image-container-main">
            <img className="product-image-main" src={mainImage}></img>
          </div>
          <div className="product-image-container-primary-all">
            {primaryImages?.map((primaryImage, index: number) => {
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
        {product && (
          <div className="product-info">
            <div className="product-info-title">{product.title}</div>
            <div className="product-info-description">
              {product.description}
            </div>
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
            <button onClick={() => toggleProductCart(product)}>
              {toggleCart ? "Delete from Cart" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
