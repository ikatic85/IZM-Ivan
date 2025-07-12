import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AutomobilCard from '../parts/AutomobilCard';


const Automobili = ({cars}) => {
    const [automobili, setAutomobili] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
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
     console.log(cars);

    return (
        <div className="komp-automobili container my-5">
            <div className="row">
                

                {automobili.map((automobil) => (
                    <AutomobilCard
                        key={automobil.id}
                        automobil={automobil}
                        column="col-md-6 col-lg-3"
                    />
                ))}

            </div>
        </div>  
    );
};
export default Automobili;
