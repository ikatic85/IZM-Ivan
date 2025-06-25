import React from 'react';
const Error = ({message}) => {

    return (
        <div className="alert alert-danger text-center my-5" role="alert">
            <h5>⚠️ Greška prilikom učitavanja</h5>
            <p>{"Došlo je do neočekivane pogreške."}</p>
            <p>{message}</p>
        </div> 
         
    );
};
export default Error;
