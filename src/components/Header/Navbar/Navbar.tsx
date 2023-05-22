import { Dispatch, SetStateAction } from "react";
import categoryArrow from "../../../icons/category-arrow.svg";
import { Link } from "react-router-dom";

import "./_navbar.scss";

interface NavbarProps {
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
  setToggleCategory: Dispatch<SetStateAction<string>>;
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav>
      <Link
        to={`/categories`}
        onClick={() => props.setToggleCategory("all categories")}
        onMouseEnter={() => props.setToggleMenu(true)}
      >
        <div className="categories-title">
          <div>Categories</div>
          <img
            alt="image"
            className="categories-arrow"
            src={categoryArrow}
          ></img>
        </div>
      </Link>
      <li>
        <a href="#">Deals</a>
      </li>
      <li>
        <a href="#">What’s New</a>
      </li>
      <li>
        <a href="#">Delivery</a>
      </li>
    </nav>
  );
}
