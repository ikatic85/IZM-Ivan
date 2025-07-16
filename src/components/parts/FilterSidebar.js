// components/FilterSidebar.js
import React from 'react';

const FilterSidebar = ({ filters, setFilters, uniqueTypes, uniqueSeats, typeCounts, seatCounts }) => {
  const handleCheckboxChange = (type, value) => {
    setFilters(prev => {
      const values = prev[type];
      return {
        ...prev,
        [type]: values.includes(value)
          ? values.filter(v => v !== value)
          : [...values, value]
      };
    });
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, cijena: e.target.value }));
  };

  return (
    <aside className="col-md-3 col-12 mb-4 filter-sidebar">
      <div className="sidebar filter-sidebar p-4 rounded shadow-sm">
        {/* TYPE FILTER */}
        <div className="mb-4">
          <h6 className="fw-bold text-uppercase">Type</h6>
          {uniqueTypes.map((type, i) => (
            <div key={i} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`type-${i}`}
                checked={filters.karoserija.includes(type)}
                onChange={() => handleCheckboxChange("karoserija", type)}
              />
              <label className="form-check-label" htmlFor={`type-${i}`}>
                {type} <span className="text-muted">({typeCounts[type] || 0})</span>
              </label>
            </div>
          ))}
        </div>

        {/* SEATS FILTER */}
        <div className="mb-4">
          <h6 className="fw-bold text-uppercase">Capacity</h6>
          {uniqueSeats.map((seat, i) => (
            <div key={i} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`seat-${i}`}
                checked={filters.sjedalo.includes(seat)}
                onChange={() => handleCheckboxChange("sjedalo", seat)}
              />
              <label className="form-check-label" htmlFor={`seat-${i}`}>
                {seat} Person <span className="text-muted">({seatCounts[seat] || 0})</span>
              </label>
            </div>
          ))}
        </div>

        {/* PRICE SLIDER */}
        <div className="mb-3">
          <h6 className="fw-bold text-uppercase">Price</h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max="500"
            value={filters.cijena}
            onChange={handlePriceChange}
          />
          <div className="small text-muted">Max: ${filters.cijena}.00</div>
        </div>

        {/* RESET */}
        <div className="d-grid mt-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              setFilters({ karoserija: [], sjedalo: [], cijena: 500 })
            }
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
