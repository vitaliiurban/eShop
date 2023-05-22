import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../../redux/productsApi";
import { Link } from "react-router-dom";
import { HeaderProps } from "../Header";

import "./_categories.scss";

function Categories(props: HeaderProps) {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: false });

  useEffect(() => {
    if (isLoading) {
      console.log(`...Loading Categories`);
    } else if (isFetching) {
      console.log(`...Fetching Categories`);
    } else if (error) {
      console.log(`Something went wrong during fetching "Categories"`);
    }
  }, [isLoading, isFetching, error]);

  return (
    <div>
      {isSuccess && (
        <div className="categories-menu">
          {data?.map((category, index) => (
            <Link
              to={
                category === "all categories"
                  ? `/categories`
                  : `/categories/${category}`
              }
              onClick={() => props.onClick(category)}
              className="category-menu"
              key={index}
            >
              <>{category}</>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
