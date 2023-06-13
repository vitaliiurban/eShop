import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductModule } from "../../models/products.model";
import { WishState, deleteFromWish, clearWish } from "../../redux/wishSlice";
import { RootState } from "../../redux/store";

import Heart from "./Heart/Heart";

import "./_wish.scss";

function Wish() {
  const dispatch = useDispatch();

  const wishList: WishState = useSelector((state: RootState) => state.wish);

  const deleteProduct = (product: ProductModule) => {
    dispatch(deleteFromWish(product));
  };
  const deleteAll = () => {
    dispatch(clearWish());
  };

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishList));
  }, [wishList]);

  return (
    <div className="wish">
      <div className="wish-title">Wish list</div>
      {wishList.length ? (
        <div className="wish-products">
          {wishList?.map((product) => {
            return (
              <div className="wish-product" key={product.id}>
                <img style={{ width: "100px" }} src={product.images[0]}></img>
                <div className="wish-product-title">{product.title}</div>
                <div>{product.price + " $"}</div>
                <div
                  className="wish-product-button-one"
                  onClick={() => {
                    deleteProduct(product);
                  }}
                >
                  <Heart className="wish" />
                </div>
              </div>
            );
          })}
          <div className="wish-products-clear" onClick={() => deleteAll()}>
            Delete all product
          </div>
        </div>
      ) : (
        <div className="wish-empty">
          <div className="wish-empty-icon">
            <Heart className="header" />
          </div>
          <div className="wish-empty-title">Your wish list is empty</div>
        </div>
      )}
    </div>
  );
}

export default Wish;
