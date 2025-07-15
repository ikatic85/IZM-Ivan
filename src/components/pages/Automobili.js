import React, { useEffect, useState } from 'react';
import CarCard from '../parts/CarCard'; // Adjust path as needed
import { Link } from 'react-router-dom';

const Automobili = ({ cars = null, colClass = 'col-md-6 col-lg-4', limit = null }) => {
    const [automobili, setAutomobili] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cars) {
            setAutomobili(cars);
            return;
        }

        const fetchAutomobili = async () => {
            try {
                const response = await fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil/?_embed&per_page=20');
                if (!response.ok) {
                    throw new Error(`Došlo je do greške: ${response.status}`);
                }
                const json = await response.json();
                setAutomobili(json);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAutomobili();
    }, [cars]);

    const displayedCars = limit ? automobili.slice(0, limit) : automobili;

    return (
        <div className="komp-automobili container my-5">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {displayedCars.map((automobil) => (
                    <div className={`${colClass} mb-4`} key={automobil.id}>
                        <CarCard automobil={automobil} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Automobili;
