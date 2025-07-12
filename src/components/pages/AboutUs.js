import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import TestimonialSlider from '../parts/TestimonialSlider';


const AboutUs = () => {
    useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

   return (
    <div className="container py-5">
      {/* Intro Section */}
      <section className="text-center mb-5" data-aos="fade-up">
        <h1 className="fw-bold mb-3">About Us</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
          Welcome to Morent – your trusted partner in car rental services. Whether you're heading out for business or leisure, we make your journey smooth, safe, and simple.
        </p>
      </section>

      {/* Mission and Values */}
      <section className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
          <img
            src="./img/Mission_and_values.jpg?text=Our+Mission"
            className="img-fluid rounded shadow-sm"
            alt="Our mission"
          />
        </div>
        <div className="col-md-6" data-aos="fade-left">
          <h2 className="fw-bold mb-3">Our Mission</h2>
          <p className="text-muted">
            At Morent, we strive to provide exceptional car rental experiences that blend convenience, affordability, and comfort.
          </p>
          <h5 className="fw-semibold mt-4">Our Values</h5>
          <ul className="list-unstyled text-muted ps-3">
            <li>✔ Transparency and honesty</li>
            <li>✔ Flexible and affordable pricing</li>
            <li>✔ Customer-first support</li>
            <li>✔ Commitment to safety and cleanliness</li>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Google Map */}
      <section data-aos="zoom-in">
        <h2 className="fw-bold text-center mb-3 visit">Visit Us</h2>
        <p className="text-center text-muted mb-4">
          We're located in the heart of Zagreb and serve customers across the region.
        </p>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.994417206288!2d15.981918415750993!3d45.81501027910617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f7e7dc1dd5%3A0x1efc395e3b9c70ff!2sZagreb!5e0!3m2!1sen!2shr!4v1626101691887!5m2!1sen!2shr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Our Location on Google Map"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
