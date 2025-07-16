// src/pages/Favorites.js
import React, { useEffect, useState } from 'react';
import CarCard from '../parts/CarCard';

const Favorites = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch("https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil/?_embed");
                const data = await res.json();
                const likedIds = JSON.parse(localStorage.getItem("likedCars") || "[]");
                const filteredCars = data.filter(car => likedIds.includes(car.id));
                setCars(filteredCars);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <p>Loading favorites...</p>;
    if (!cars.length) return <p>No favorites found.</p>;

    return (
        <div className="container py-4">
            <h2 className="mb-4">My Favorite Cars</h2>
            <div className="row">
                {cars.map(car => (
                    <div className="col-md-4 mb-4" key={car.id}>
                        <CarCard automobil={car} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;