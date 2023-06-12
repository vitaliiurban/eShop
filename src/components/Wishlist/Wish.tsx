import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductModule } from "../../models/products.model";
import { WishState, deleteFromWish, clearWish } from "../../redux/wishSlice";
import { RootState } from "../../redux/store";

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
    <div>
      <div>Wish list</div>
      {wishList?.map((product) => {
        return (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>{product.price + " $"}</div>
            <img style={{ width: "100px" }} src={product.images[0]}></img>
            <button
              onClick={() => {
                deleteProduct(product);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <button onClick={() => deleteAll()}>Delete all product</button>
    </div>
  );
}

export default Wish;
