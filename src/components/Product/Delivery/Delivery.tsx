import "./_delivery.scss";

function Delivery() {
  return (
    <div className="delivery">
      <div className="delivery-container-free">
        <div className="delivery-free icon">
          <svg
            className="icon-free"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h48v48H0z" fill="none" />
            <g id="Shopicon">
              <path
                d="M42,6H18c-2.2,0-4,1.8-4,4v4C7.4,14,2,19.4,2,26v12h4c0,3.314,2.686,6,6,6s6-2.686,6-6h8c0,3.314,2.686,6,6,6s6-2.686,6-6
        h4c2.2,0,4-1.8,4-4V10C46,7.8,44.2,6,42,6z M12,40c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S13.103,40,12,40z M14,32.349
        C13.374,32.127,12.702,32,12,32c-1.775,0-3.365,0.775-4.463,2H6v-6h8V32.349z M14,24H6.263c0.892-3.445,4.017-6,7.737-6V24z M32,40
        c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S33.103,40,32,40z M42,34h-5.537c-1.099-1.225-2.688-2-4.463-2s-3.365,0.775-4.463,2
        H18V10h24V34z"
              />
            </g>
          </svg>
        </div>
        <div className="delivery-free">
          <div className="delivery-free-title">Free Delivery</div>
          <div className="delivery-free-description">
            Enter your Postal code for Delivery Availability
          </div>
        </div>
      </div>
      <div className="delivery-container-return">
        <div className="delivery-return icon">
          <svg
            className="icon-return"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M14 20.889L12.777 21.5684C12.4934 21.726 12.3516 21.8047 12.2015 21.8356C12.0685 21.863 11.9315 21.863 11.7986 21.8356C11.6484 21.8047 11.5066 21.726 11.223 21.5684L3.82297 17.4573C3.52346 17.2909 3.37368 17.2077 3.26463 17.0893C3.16816 16.9847 3.09515 16.8606 3.05048 16.7254C3 16.5726 3 16.4013 3 16.0586V7.94153C3 7.59889 3 7.42757 3.05048 7.27477C3.09515 7.13959 3.16816 7.01551 3.26463 6.91082C3.37368 6.79248 3.52345 6.70928 3.82297 6.54288L11.223 2.43177C11.5066 2.27421 11.6484 2.19543 11.7986 2.16454C11.9315 2.13721 12.0685 2.13721 12.2015 2.16454C12.3516 2.19543 12.4934 2.27421 12.777 2.43177L20.177 6.54288C20.4766 6.70928 20.6263 6.79248 20.7354 6.91082C20.8318 7.01551 20.9049 7.13959 20.9495 7.27477C21 7.42757 21 7.59889 21 7.94153L21 12.5001M7.5 4.50008L16.5 9.50008M16 18.0001L18 20.0001L22 16.0001"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="delivery-return">
          <div className="delivery-return-title">Return Delivery</div>
          <div className="delivery-return-description">
            Free 30days Delivery Return. Details
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
