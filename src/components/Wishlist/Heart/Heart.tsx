import "./_heart.scss";

interface HeartProps {
  toggleWish?: boolean;
  className?: string;
}

function Heart({ toggleWish, className }: HeartProps) {
  return (
    <>
      {toggleWish ? (
        <svg
          className={`${
            className === "header"
              ? "header-heart active"
              : className === "wish"
              ? "wish-heart active"
              : "heart active"
          }`}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 800 800"
          xmlSpace="preserve"
        >
          <path
            className={`${
              className === "header"
                ? "stroke-header"
                : className === "wish"
                ? "stroke-wish"
                : "stroke active"
            }`}
            d="M101.1,341.2c7,26.8,20.4,50.1,40.2,70l264.4,273.7l264.4-273.7c19.8-19.8,33.2-43.1,40.2-70
      c7-26.8,7-53.5,0-79.9c-7-26.4-20.4-49.5-40.2-69.3c-19.8-19.8-42.9-33.2-69.3-40.2c-26.4-7-53.2-7-80.5,0
      c-27.2,7-50.4,20.4-69.3,40.2l-45.2,54.5L360.5,192c-19.8-19.8-42.9-33.2-69.3-40.2c-26.4-7-53-7-79.9,0c-26.8,7-50.1,20.4-70,40.2
      s-33.2,42.9-40.2,69.3C94.1,287.8,94.1,314.4,101.1,341.2z"
          />
        </svg>
      ) : (
        <svg
          className={`${
            className === "header"
              ? "header-heart inactive"
              : className === "wish"
              ? "wish-heart inactive"
              : "heart inactive"
          }`}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 800 800"
          xmlSpace="preserve"
        >
          <path
            className={`${
              className === "header"
                ? "stroke-header"
                : className === "wish"
                ? "stroke-wish"
                : "stroke"
            }`}
            d="M101.1,341.2c7,26.8,20.4,50.1,40.2,70l264.4,273.7l264.4-273.7c19.8-19.8,33.2-43.1,40.2-70
      c7-26.8,7-53.5,0-79.9c-7-26.4-20.4-49.5-40.2-69.3c-19.8-19.8-42.9-33.2-69.3-40.2c-26.4-7-53.2-7-80.5,0
      c-27.2,7-50.4,20.4-69.3,40.2l-45.2,54.5L360.5,192c-19.8-19.8-42.9-33.2-69.3-40.2c-26.4-7-53-7-79.9,0c-26.8,7-50.1,20.4-70,40.2
      s-33.2,42.9-40.2,69.3C94.1,287.8,94.1,314.4,101.1,341.2z"
          />
        </svg>
      )}
    </>
  );
}

export default Heart;
