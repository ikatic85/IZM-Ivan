import React from "react";

const CarFilterSidebar = ({ filters, setFilters, categoryCounts, availableOptions, onApply }) => {
  const handleCheckboxChange = (section, value) => {
    setFilters((prev) => {
      const current = new Set(prev[section]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [section]: current };
    });
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: Number(e.target.value),
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: new Set(),
      capacity: new Set(),
      price: 1000,
    });
  };

  return (
    <aside className="filter-sidebar sidebar p-3">
      <h6 className="fw-bold">Type</h6>
      {availableOptions.types.map((type) => (
        <div className="form-check" key={type}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`type-${type}`}
            checked={filters.type.has(type)}
            onChange={() => handleCheckboxChange("type", type)}
          />
          <label className="form-check-label" htmlFor={`type-${type}`}>
            {type} ({categoryCounts[type] || 0})
          </label>
        </div>
      ))}

      <hr />
      <h6 className="fw-bold">Capacity</h6>
      {availableOptions.capacities.map((cap) => (
        <div className="form-check" key={cap}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`cap-${cap}`}
            checked={filters.capacity.has(cap)}
            onChange={() => handleCheckboxChange("capacity", cap)}
          />
          <label className="form-check-label" htmlFor={`cap-${cap}`}>
            {cap === "8+" ? "8 or more" : `${cap} Person`} ({categoryCounts[cap] || 0})
          </label>
        </div>
      ))}

      <hr />
      <h6 className="fw-bold">Price</h6>
      <label htmlFor="priceRange" className="form-label">
        Max. ${filters.price}
      </label>
      <input
        type="range"
        className="form-range price-range"
        min="0"
        max="1000"
        step="10"
        value={filters.price}
        onChange={handlePriceChange}
        id="priceRange"
      />

      <button className="btn btn-primary mt-4 w-100" onClick={onApply}>
        Apply Filters
      </button>
      <button className="btn btn-outline-secondary mt-2 w-100" onClick={resetFilters}>
        Reset Filters
      </button>
    </aside>
  );
};

export default CarFilterSidebar;