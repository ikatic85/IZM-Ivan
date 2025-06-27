import React, { useState, useEffect } from "react";
import Automobili from "./Automobili";
import BlogCard from "../parts/BlogCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Lightbox1 from "../parts/Lightbox1";
import LocationSelectorGroup from "../parts/LocationSelectorGroup";


const Home = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

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

         try {
            const response = await fetch('https://wp1.edukacija.online/backend/wp-json/wp/v2/posts?per_page=6&_embed');
            if (!response.ok) {
            throw new Error(`Došlo je do greške: ${response.status}`);
            }
            const json = await response.json();
            setPosts(json);
        } catch (err) {
            setError(err.message);
        }
        };

        fetchPage();
    }, []);

    if (error) return <p>Greška: {error}</p>;
    if (!data) return <p>Učitavanje...</p>;

    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      
    ]
  };

    return(
        <>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
          <LocationSelectorGroup
            title="Pick–Up"
            locations={["Zagreb", "Split", "Rijeka", "Osijek"]}
            values={pickup}
            onChange={handlePickupChange}
          />
            </div>
            <div className="col-md-6">
          <LocationSelectorGroup
            title="Drop–Off"
            locations={["Zagreb", "Split", "Rijeka", "Osijek"]}
            values={dropoff}
            onChange={handleDropoffChange}
          />
          </div>
        </div>
        </div>
        <Automobili />
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />

        
        <div className="container">
            <h3 className="mb-4">Posljednji članci</h3>
                <div className="">
        

                  <Slider {...settings}>
                      {posts.map(item => (
                          <div className="px-3" key={item.id}>
                              <BlogCard
                                  item={item}
                                  column=""
                              />
                          </div>
                      ))}
                  </Slider>
                  <h3>Ovo je Lightbox</h3>
                  <Lightbox1 />
        
                </div>  
          </div>     

        </>
    );
};

export default Home;
