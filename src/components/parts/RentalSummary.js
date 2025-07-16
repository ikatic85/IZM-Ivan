// components/RentalSummary.js
import React from 'react';

const RentalSummary = ({ car, pickup, dropoff }) => {
  if (!car) return null;

  const pricePerDay = parseFloat(car._embedded?.["wp:term"]?.flat()?.find(t => t.taxonomy === "cijena")?.name || "0");

  const getDays = () => {
    if (!pickup?.date || !dropoff?.date) return 0;
    const start = new Date(pickup.date);
    const end = new Date(dropoff.date);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = getDays();
  const total = pricePerDay * days;

  return (
    <div className="p-3 border rounded bg-light">
      <h4>Rental Summary</h4>
      <p className="text-muted">Prices may change depending on the length of rental.</p>

      <div className="d-flex align-items-center mt-4">
        <img src={car.acf?.slika1} alt={car.title.rendered} width="100" className="me-3 rounded" />
        <div>
          <h5>{car.title.rendered}</h5>
          <p className="mb-1 text-muted">440+ Reviews</p>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-between">
        <span>Pickup location</span><span>{pickup.location}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Dropoff location</span><span>{dropoff.location}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Rent duration</span><span>{days} days</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Price per day</span><span>${pricePerDay}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Tax</span><span>$0</span>
      </div>

      <div className="mt-4">
        <input className="form-control" type="text" placeholder="Apply promo code" />
        <button className="btn btn-secondary w-100 mt-2">Apply now</button>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <div>
          <h5>Total rental price</h5>
          <small className="text-muted">Includes any applicable discounts</small>
        </div>
        <h5>${total.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default RentalSummary;