import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import CarCard from '../parts/CarCard';
import { useMediaQuery } from 'react-responsive';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Automobili = ({ cars = null, colClass = 'col-md-6 col-lg-4', limit = null }) => {
  const [automobili, setAutomobili] = useState([]);
  const [error, setError] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

  useEffect(() => {
    if (cars) {
      setAutomobili(cars);
      return;
    }

    const fetchAutomobili = async () => {
      try {
        const response = await fetch(
          'https://wp1.edukacija.online/backend/wp-json/wp/v2/automobil/?_embed&per_page=20'
        );
        if (!response.ok) throw new Error(`Došlo je do greške: ${response.status}`);
        const json = await response.json();
        setAutomobili(json);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAutomobili();
  }, [cars]);

  const displayedCars = limit ? automobili.slice(0, limit) : automobili;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    autoplay: false,
    slidesToShow: isTablet ? 2 : 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="komp-automobili container my-5">
      {error && <div className="alert alert-danger">{error}</div>}

      {isMobile || isTablet ? (
        <Slider {...sliderSettings}>
          {displayedCars.map((automobil) => (
            <div key={automobil.id} className="px-2">
              <CarCard automobil={automobil} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="row">
          {displayedCars.map((automobil) => (
            <div className={`${colClass} mb-4`} key={automobil.id}>
              <CarCard automobil={automobil} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Automobili;
