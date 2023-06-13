import "./_promotion.scss";
function Promotion() {
  return (
    <div>
      <div className="promotion">
        <div className="promotion-image-container">
          <img className="promotion-image reverse" src="/images/01.png"></img>
        </div>
        <div>
          <div>Do you need a new phone or something else?</div>
          <div>We offer the cheapest prices and fast delivery.</div>
        </div>
        <div className="promotion-image-container">
          <img className="promotion-image" src="/images/04.png"></img>
        </div>
      </div>
    </div>
  );
}
export default Promotion;
