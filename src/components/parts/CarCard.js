import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const CarCard = ({ automobil }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Check if this car is already liked (optional persistent state)
        const likedCars = JSON.parse(localStorage.getItem("likedCars") || "[]");
        if (likedCars.includes(automobil.id)) {
            setLiked(true);
        }
    }, [automobil.id]);

    const [clicked, setClicked] = useState(false);

    const handleLikeClick = () => {
        const isLoggedIn = localStorage.getItem("username");

        if (!isLoggedIn) {
            alert("Please log in to save this car to your favorites.");
            return;
        }

        const updatedLiked = !liked;
        setLiked(updatedLiked);

        // Animate icon
        setClicked(true);
        setTimeout(() => setClicked(false), 200); // Reset after animation

        // Save liked cars to localStorage
        let likedCars = JSON.parse(localStorage.getItem("likedCars") || "[]");

        if (updatedLiked) {
            likedCars.push(automobil.id);
        } else {
            likedCars = likedCars.filter(id => id !== automobil.id);
        }

        localStorage.setItem("likedCars", JSON.stringify(likedCars));
    };

    return (
        <div className="car-card h-100 d-flex flex-column">
            <div className="d-flex justify-content-between like">
                <Link to="/detail"><h5>{automobil.title.rendered}</h5></Link>
                <button className="like-full btn p-0 border-0 bg-transparent" onClick={handleLikeClick}>
                    <img
                        src={liked ? "/img/heart-filled.svg" : "/img/heart.svg"}
                        alt={liked ? "Liked" : "Like"}
                        className={`heart-icon ${clicked ? "clicked" : ""}`}
                    />
                </button>
            </div>
            <p className="car-type">
                <Link to="#">
                    {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "karoserija")}
                </Link>
            </p>
            <Link to="/detail" className="car-img mb-3">
                <img
                    src={automobil._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url}
                    alt={automobil.title.rendered}
                    className="img-fluid w-100"
                />
            </Link>
            <div className="d-flex justify-content-between mb-2">
                <div className="car-fuel">
                    {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "tank")} L
                </div>
                <div className="car-gear">
                    {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "mjenjac")}
                </div>
                <div className="car-seats">
                    {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "sjedalo")}
                </div>
            </div>
            <div className="d-flex justify-content-between mt-auto">
                <div className="car-price">
                    {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "cijena")}<span>/day</span>
                </div>
                <div className="car-button">
                    <Link to="/payment" className="btn btn-primary">Rent Now</Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
