import { Dispatch, SetStateAction } from "react";
import { useGetCategoriesQuery } from "../../../redux/productsApi";
import { Link } from "react-router-dom";

import "./_categories.scss";
import { CategoriesModule } from "../../../models/products.model";
interface Categories {
  data?: CategoriesModule[];
  setToggleCategory: Dispatch<SetStateAction<string>>;
  onClick: (category: CategoriesModule) => void;
}

function Categories({ data, onClick }: Categories) {
  return (
    <div>
      <div className="categories-menu">
        {data?.map((category, index) => (
          <Link
            to={
              category === "all categories"
                ? `/categories`
                : `/categories/${category}`
            }
            onClick={() => onClick(category)}
            className="category-menu"
            key={index}
          >
            <>{category}</>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
