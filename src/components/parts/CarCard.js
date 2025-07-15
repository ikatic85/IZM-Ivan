// src/components/CarCard.js
import React from 'react';
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
    return (
        <div className="car-card h-100 d-flex flex-column">
            <div className="d-flex justify-content-between like">
                <Link to="/detail"><h5>{automobil.title.rendered}</h5></Link>
                <Link to="#" className="like-full">
                    <img src="/img/heart.svg" alt="Like" />
                </Link>
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
                    <Link to="/detail" className="btn btn-primary">Rent Now</Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
