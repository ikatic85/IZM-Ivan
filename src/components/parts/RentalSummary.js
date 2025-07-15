import React from "react";


const RentalSummary = ({ selectedCar, pickupDate, dropoffDate }) => {
  if (!selectedCar) return null;

  const getTotalDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  };

  const totalDays = getTotalDays(pickupDate, dropoffDate);
  const subtotal = selectedCar.price;
  const total = subtotal * totalDays;

  return (
    <div className="col-12 col-lg-4 form-section summary">
      <h4>Rental Summary</h4>
      <p>
        Prices may change depending on the length of the rental and the price of your rental car.
      </p>

      <div className="d-flex mt-5">
        <div>
          <img src={selectedCar.image} alt={selectedCar.name} />
        </div>
        <div className="m-auto div-h">
          <h2>{selectedCar.name}</h2>
          <div>
            <div id="rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < selectedCar.rating ? "filled" : ""}>★</span>
              ))}
            </div>
            <div className="reviewers">
              <p>{selectedCar.reviews}+ Reviewer</p>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex mt-4 sub">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="d-flex sub">
        <span>Tax</span>
        <span>$0</span>
      </div>

      <div className="promo-container">
        <input className="promo-input" type="text" placeholder="Apply promo code" />
        <button className="apply-button">Apply now</button>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <div className="rental">
          <h4>Total rental price</h4>
          <p>Overall price and includes rental discount</p>
        </div>
        <div className="total">${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default RentalSummary;