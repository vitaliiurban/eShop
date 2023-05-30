import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useGetProductsQuery } from "../../redux/productsApi";
import { ProductModule } from "../../models/products.model";

import ReactPaginate from "react-paginate";
import "./_products.scss";
import "./_pagination.scss";
import { Link } from "react-router-dom";

interface ProductsProps {
  toggleCategory: string;
  setToggleProduct: Dispatch<SetStateAction<ProductModule | undefined>>;
}

function Products(props: ProductsProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetProductsQuery();
  const products = data as ProductModule[] | undefined;
  const filteredProducts = products?.filter(
    (product) => product.category === props.toggleCategory
  );
  const productsPerPage: number = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = products
    ? filteredProducts
      ? props.toggleCategory === "all categories"
        ? Math.ceil(products.length / productsPerPage)
        : Math.ceil(filteredProducts.length / productsPerPage)
      : 0
    : 0;
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  const openProduct = (product: ProductModule) => {
    props.setToggleProduct(product);
  };

  const renderProduct = (product: ProductModule) => (
    <Link
      onClick={() => openProduct(product)}
      to={
        props.toggleCategory &&
        `/categories/${props.toggleCategory}/${product.title.replace(
          /\s+/g,
          ""
        )}`
      }
      className="category-product-container"
      key={product.id}
    >
      <div className="category-products-img-container">
        <img className="category-products-image" src={product.images[0]}></img>
      </div>
      <div className="category-product-info">
        <p className="category-product-info-title">{product.title}</p>
        <p className="category-product-info-price">{product.price + " $"}</p>
      </div>
    </Link>
  );

  const displayProducts =
    props.toggleCategory === "all categories"
      ? products
          ?.slice(pagesVisited, pagesVisited + productsPerPage)
          .map(renderProduct)
      : filteredProducts
          ?.slice(pagesVisited, pagesVisited + productsPerPage)
          .map(renderProduct);

  // isLoading && console.log(`...Loading Products`);
  // isFetching && console.log(`...Fetching Products`);
  // error && console.log(`Something went wrong during fetching "Products"`);

  useEffect(() => {
    localStorage.setItem("toggleCategory", props.toggleCategory);
  }, [props.toggleCategory]);
  return (
    <div className="category-products">
      <div className="category-products-title">
        {props.toggleCategory.charAt(0).toUpperCase() +
          props.toggleCategory.slice(1)}
      </div>
      {isSuccess && (
        <div className="category-products-container">{displayProducts}</div>
      )}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination-btns"}
          previousLinkClassName={"previous-btn"}
          nextLinkClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </div>
  );
}

export default Products;
