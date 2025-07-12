import React from 'react';
import './TestimonialSlider.css'; // For custom styles

const testimonials = [
  {
    name: "Ana K.",
    role: "Marketing Specialist",
    quote: "I loved every second of it. Super clean service, reliable car and fast support!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Ivan M.",
    role: "Software Engineer",
    quote: "Smooth process from booking to drop-off. Great experience overall.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Lucija P.",
    role: "Content Creator",
    quote: "Loved the pricing flexibility and car options. Will definitely rent again!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Marko L.",
    role: "Entrepreneur",
    quote: "Exceptional service, well-maintained vehicles and great support team.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

const TestimonialSlider = () => {
  return (
    <section className="testimonial-section py-5" data-aos="fade-up">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Don’t just take our word for it</h2>
        <div id="carouselTestimonials" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {testimonials.map((t, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="testimonial-card mx-auto p-4 rounded shadow-sm">
                  <p className="quote-text mb-4">“{t.quote}”</p>
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar mb-2" />
                  <h6 className="fw-semibold mb-0">{t.name}</h6>
                  <small className="text-muted">{t.role}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Indicators */}
          <div className="carousel-indicators position-relative mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselTestimonials"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
