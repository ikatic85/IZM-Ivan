// pages/Category.js
import React, { useEffect, useState } from 'react';
import Automobili from './Automobili';
import FilterSidebar from '../parts/FilterSidebar';
import LocationSelectorGroup from '../parts/LocationSelectorGroup';
import { Link } from 'react-router-dom';

const Category = () => {
  const [automobili, setAutomobili] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    karoserija: [],
    sjedalo: [],
    cijena: 500
  });

  const [pickup, setPickup] = useState({ location: "", date: "", time: "" });
      const [dropoff, setDropoff] = useState({ location: "", date: "", time: "" });
  
      const handlePickupChange = (field, value) => {
        setPickup((prev) => ({ ...prev, [field]: value }));
      };
  
      const handleDropoffChange = (field, value) => {
        setDropoff((prev) => ({ ...prev, [field]: value }));
      };

  useEffect(() => {
    fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil/?_embed&per_page=100')
      .then(res => res.json())
      .then(data => {
        setAutomobili(data);
        setFilteredCars(data);
      });
  }, []);

  // Category.js (inside your component)
const getTaxonomyCount = (taxonomy) => {
  const counts = {};
  automobili.forEach(car => {
    const term = extractTaxonomy(car._embedded?.["wp:term"], taxonomy);
    if (term) {
      counts[term] = (counts[term] || 0) + 1;
    }
  });
  return counts;
};


  const extractTaxonomy = (terms, taxonomy) => {
    if (!terms) return null;
    for (const group of terms) {
      for (const term of group) {
        if (term.taxonomy === taxonomy) return term.name;
      }
    }
    return null;
  };

  useEffect(() => {
    const filtered = automobili.filter(car => {
      const karoserija = extractTaxonomy(car._embedded?.["wp:term"], "karoserija");
      const sjedalo = extractTaxonomy(car._embedded?.["wp:term"], "sjedalo");
      const cijena = parseFloat(extractTaxonomy(car._embedded?.["wp:term"], "cijena"));

      const matchType = !filters.karoserija.length || filters.karoserija.includes(karoserija);
      const matchSeat = !filters.sjedalo.length || filters.sjedalo.includes(sjedalo);
      const matchPrice = !isNaN(cijena) && cijena <= filters.cijena;

      return matchType && matchSeat && matchPrice;
    });

    setFilteredCars(filtered);
  }, [filters, automobili]);

  const getUniqueTerms = (taxonomy) => {
    const all = automobili.map(a => extractTaxonomy(a._embedded?.["wp:term"], taxonomy));
    return [...new Set(all)].filter(Boolean);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              uniqueTypes={getUniqueTerms("karoserija")}
              uniqueSeats={getUniqueTerms("sjedalo")}
              typeCounts={getTaxonomyCount("karoserija")}
              seatCounts={getTaxonomyCount("sjedalo")}
        />
        
        {/* Main content area for displaying cars */}
        <div className="col-md-9">
           <div className="row">
            <div className="col-md-6">
              <LocationSelectorGroup
                title="Pick–Up"
                locations={["Zagreb", "Split", "Rijeka", "Osijek", "Dubrovnik", "Pula", "Zadar", "Šibenik", "Karlovac"]}
                values={pickup}
                onChange={handlePickupChange}
              />
            </div>
            <div className="col-md-6">
              <LocationSelectorGroup
                title="Drop–Off"
                locations={["Zagreb", "Split", "Rijeka", "Osijek", "Dubrovnik", "Pula", "Zadar", "Šibenik", "Karlovac"]}
                values={dropoff}
                onChange={handleDropoffChange}
              />
            </div>
            <div className="col-12 text-center mt-4">
              <div className="car-button">
							<Link to="/payment" className="btn btn-primary">Go to Payment</Link>
						</div>
            </div>
          </div>
          <Automobili cars={filteredCars} colSize={4} />
        </div>
      </div>
    </div>
  );
};

export default Category;
