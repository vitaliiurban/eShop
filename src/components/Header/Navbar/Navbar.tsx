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
    <nav onMouseEnter={() => props.setToggleMenu(true)}>
      <Link
        to={`/categories`}
        onClick={() => props.setToggleCategory("all categories")}
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
    </nav>
  );
}
