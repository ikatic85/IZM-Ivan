import React, { useState, useEffect } from "react";
import Automobili from "./Automobili";
import LocationSelectorGroup from "../parts/LocationSelectorGroup";
import { Link } from "react-router-dom";
import Banners from "../parts/Banners";


const Home = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [pickup, setPickup] = useState({ location: "", date: "", time: "" });
    const [dropoff, setDropoff] = useState({ location: "", date: "", time: "" });

    const handlePickupChange = (field, value) => {
      setPickup((prev) => ({ ...prev, [field]: value }));
    };

    const handleDropoffChange = (field, value) => {
      setDropoff((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
    const fetchPage = async () => {
        try {
            const response = await fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/pages/404');
            if (!response.ok) {
            throw new Error(`Došlo je do greške: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        }

        };

        fetchPage();
    }, []);

    if (error) return <p>Greška: {error}</p>;
    if (!data) return <p>Učitavanje...</p>;

    

    return(
        <>
        <Banners />
        <div className="container">
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
							<Link to="/category" className="btn btn-primary">Search car</Link>
						</div>
            </div>
          </div>
        </div>
        <Automobili />
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />     
        </>
    );
};

export default Home;
