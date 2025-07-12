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

const AutomobilCard = ({ automobil, column = "col-md-3 col-sm-6 col-12 mb-4" }) => {
    return (
        <div className={column}>
            <div className="car-card">
                <div className="d-flex like">
                    <Link to="#"><h5>{automobil.title.rendered}</h5></Link>
                    <Link to="#" className="like-full"><img src="img/heart.svg" alt="Like" /></Link>
                </div>
                <p className="car-type">
                    <Link to="#">{getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "karoserija")}</Link>
                </p>
                <Link to="#" className="car-img">
                    <img
                        src={automobil._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large?.source_url}
                        alt={automobil.title.rendered}
                        className="img-fluid"
                    />
                </Link>
                <div className="d-flex">
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
                <div className="d-flex">
                    <div className="car-price">
                        {getTermNameByTaxonomy(automobil._embedded?.["wp:term"], "cijena")}<span>/day</span>
                    </div>
                    <div className="car-button">
                        <Link to="/detail" className="btn btn-primary">Rent Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomobilCard;