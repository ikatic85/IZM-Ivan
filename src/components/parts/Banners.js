import React from 'react';
const Banners = () => {

    return (
        <section className="container banners">
            <div className="row">
                <div className="col-md-6 mb-4 mb-md-0">
                    <div className="banner">
                        <h1>The Best Platform for Car Rental</h1>
                        <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
                        <a href="/category" className="button">Rental Car</a>
                    </div>
                </div>	
                <div className="col-md-6">
                    <div className="banner banner-2">
                        <h1>Easy way to rent a car at a low price</h1>
                        <p>Providing cheap car rental services and safe and comfortable facilities.</p>
                        <a href="/category" className="button">Rental Car</a>
                    </div> 
                </div>
            </div>
        </section>   
    );
};
export default Banners;
