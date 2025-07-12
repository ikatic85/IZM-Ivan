import React, { useState, useEffect } from "react";
import Automobili from "./Automobili";
import LocationSelectorGroup from "../parts/LocationSelectorGroup";
import CarFilterSidebar from "../parts/CarFilterSidebar";

const Category = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [availableOptions, setAvailableOptions] = useState({ types: [], capacities: [] });

  const [filters, setFilters] = useState(() => {
    const stored = localStorage.getItem("carFilters");
    return stored
      ? JSON.parse(stored, (key, value) => (key === "type" || key === "capacity" ? new Set(value) : value))
      : {
          type: new Set(),
          capacity: new Set(),
          price: 1000,
        };
  });

  const [applyFilter, setApplyFilter] = useState(false);
  const [pickup, setPickup] = useState({ location: "", date: "", time: "" });
  const [dropoff, setDropoff] = useState({ location: "", date: "", time: "" });
  const [showFilters, setShowFilters] = useState(false);

  const getTermNameByTaxonomy = (terms, taxonomyName) => {
    if (!terms || !Array.isArray(terms)) return null;
    for (const termGroup of terms) {
        for (const term of termGroup) {
            if (term.taxonomy === taxonomyName) {
                return term.name;
            }
        }
    }
    return null;
};

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil?_embed");
        if (!response.ok) throw new Error("Greška prilikom dohvaćanja automobila");
        const cars = await response.json();

        const formattedCars = cars.map((car) => ({
          id: car.id,
          name: car.title.rendered,
          type: getTermNameByTaxonomy(car._embedded?.["wp:term"], "karoserija") || "Unknown",
          capacity: getTermNameByTaxonomy(car._embedded?.["wp:term"], "sjedalo") || "Unknown",
          price: getTermNameByTaxonomy(car._embedded?.["wp:term"], "cijena") || 0,
          image: car._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url || "default.jpg",
          ...car
        }));

        console.log(formattedCars);

        setAllCars(formattedCars);
       /* setFilteredCars(formattedCars);*/

        const types = [...new Set(formattedCars.map((car) => car.type))];
        const capacities = [...new Set(formattedCars.map((car) => (car.capacity >= 8 ? "8+" : String(car.capacity))))];
        setAvailableOptions({ types, capacities });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "carFilters",
      JSON.stringify(
        {
          ...filters,
          type: Array.from(filters.type),
          capacity: Array.from(filters.capacity),
        }
      )
    );
  }, [filters]);

  useEffect(() => {
    if (!applyFilter) return;

    const filtered = allCars.filter((car) => {
      const cap = car.capacity >= 8 ? "8+" : String(car.capacity);
      return (
        (filters.type.size === 0 || filters.type.has(car.type)) &&
        (filters.capacity.size === 0 || filters.capacity.has(cap)) &&
        car.price <= filters.price
      );
    });

    setFilteredCars(filtered);
    setApplyFilter(false);
  }, [applyFilter]);

  const getCategoryCounts = () => {
    const counts = {};
    for (const car of allCars) {
      counts[car.type] = (counts[car.type] || 0) + 1;
      const cap = car.capacity >= 8 ? "8+" : String(car.capacity);
      counts[cap] = (counts[cap] || 0) + 1;
    }
    return counts;
  };

  if (error) return <p>Greška: {error}</p>;
  if (!allCars) return <p>Učitavanje...</p>;

  console.log(filteredCars);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <LocationSelectorGroup
            title="Pick–Up"
            locations={["Zagreb", "Split", "Rijeka", "Osijek", "Dubrovnik"]}
            values={pickup}
            onChange={(field, value) => setPickup((prev) => ({ ...prev, [field]: value }))}
          />
        </div>
        <div className="col-md-6">
          <LocationSelectorGroup
            title="Drop–Off"
            locations={["Zagreb", "Split", "Rijeka", "Osijek", "Dubrovnik"]}
            values={dropoff}
            onChange={(field, value) => setDropoff((prev) => ({ ...prev, [field]: value }))}
          />
        </div>

        <div className="d-md-none text-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="row mt-4">
          <div className={`col-md-3 ${showFilters ? '' : 'd-none d-md-block'}`}>
            <CarFilterSidebar
              filters={filters}
              setFilters={setFilters}
              categoryCounts={getCategoryCounts()}
              availableOptions={availableOptions}
              onApply={() => setApplyFilter(true)}
            />
          </div>

          <div className="col-md-9">
            <Automobili cars={filteredCars} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
