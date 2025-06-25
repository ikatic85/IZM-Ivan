import React from 'react';


const Img = ({src ,size="medium_large", alt="Nema opisa za sliku", classList}) => {
    let url = "https://placehold.co/600x400?text=Nema+Slike";
    if(src?.sizes?.[size]){
       url = src?.sizes?.[size]?.source_url;
    } else if(src?.sizes?.["full"]) {
        url = src?.sizes?.["full"]?.source_url;
    }
    console.log("URL slike: ", url);
    return(
        <img src={url} alt={alt} className={classList + ' featured-image'} />
    );
};
export default Img;