import React, { useEffect, useState } from 'react';
const Automobili = () => {
    const [automobili, setAutomobili] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAutomobili = async () => {
            try {
                const response = await fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil/?_embed');
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
    }, []);

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


    return (
        <div className="komp-automobili container my-5">
            <div className="row">
                {automobili.map((automobil) => (
                    <div className="col-md-6 col-lg-3">
				<div className="car-card">
					<div className="d-flex like">
						<a href="#"><h5>{automobil.title.rendered}</h5></a>
						<a href="#" className="like-full"><img src="img/heart.svg" /></a>
					</div>
					<p className="car-type"><a href="#">{getTermNameByTaxonomy(automobil._embedded?.["wp:term"],"karoserija")}</a></p>
					<a href="#" className="car-img">
                        <img src={automobil._embedded?.["wp:featuredmedia"]?.[0].media_details.sizes.medium_large.source_url} />   
                        </a>
					<div className="d-flex">
						<div className="car-fuel">{getTermNameByTaxonomy(automobil._embedded?.["wp:term"],"tank")}</div>
						<div className="car-gear">{getTermNameByTaxonomy(automobil._embedded?.["wp:term"],"mjenjac")}</div>
						<div className="car-seats">{getTermNameByTaxonomy(automobil._embedded?.["wp:term"],"sjedalo")}</div>
					</div>
					<div className="d-flex">
						<div className="car-price">
							
                            {getTermNameByTaxonomy(automobil._embedded?.["wp:term"],"cijena")}<span>/day</span>
						</div>
						<div className="car-button">
							<a href="#" className="btn btn-primary">Rent Now</a>
						</div>
					</div>
				</div>
			</div>

               ) )}
            </div>
        </div>  
    );
};
export default Automobili;
