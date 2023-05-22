import { useState, Dispatch, SetStateAction } from "react";

import Navbar from "./Navbar/Navbar";
import Categories from "./Categories/Categories";

import { CategoriesModule } from "../../models/products.model";

import "./_header.scss";

export interface HeaderProps {
  onClick: (category: CategoriesModule) => void;
  setToggleCategory: Dispatch<SetStateAction<string>>;
}

function Header(props: HeaderProps) {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <header onMouseLeave={() => setToggleMenu(false)}>
      <div className="main-menu">
        <img alt="" />
        <Navbar
          setToggleMenu={setToggleMenu}
          setToggleCategory={props.setToggleCategory}
        />
        <input type="text" />
        <div>Account</div>
        <div>Cart</div>
      </div>
      {toggleMenu && (
        <Categories
          setToggleCategory={props.setToggleCategory}
          onClick={props.onClick}
        />
      )}
    </header>
  );
}

export default Header;
