import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useGetCategoriesQuery } from "../../redux/productsApi";
import { Link } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Categories from "./Categories/Categories";

import { CategoriesModule } from "../../models/products.model";

import "./_header.scss";
import CartIcon from "./CartIcon/CartIcon";
import Heart from "../Wishlist/Heart/Heart";
export interface HeaderProps {
  onClick: (category: CategoriesModule) => void;
  toggleMenu?: boolean;
  setToggleCategory: Dispatch<SetStateAction<string>>;
  setBlurScreen: Dispatch<SetStateAction<boolean>>;
}

function Header(props: HeaderProps) {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: false });
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  useEffect(() => {
    props.setBlurScreen(toggleMenu);
  }, [toggleMenu]);

  return (
    <header onMouseLeave={() => setToggleMenu(false)}>
      <div className="main-menu">
        <Link to={"/"}>
          <img className="main-menu-image" alt="eShop" src="/logo.png" />
        </Link>
        <Navbar
          setToggleMenu={setToggleMenu}
          setToggleCategory={props.setToggleCategory}
        />

        <Link className="wishicon" to={`/wish`}>
          <Heart toggleWish={false} className={"header"} />
          <div className="wishicon-title">Wish</div>
        </Link>

        <Link className="carticon" to={`/cart`}>
          <CartIcon />
          <div className="carticon-title">Cart</div>
        </Link>
      </div>
      {toggleMenu && (
        <Categories
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
          setToggleCategory={props.setToggleCategory}
          onClick={props.onClick}
          data={data}
        />
      )}
    </header>
  );
}

export default Header;
