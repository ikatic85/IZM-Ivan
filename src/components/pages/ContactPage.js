import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    queryType: '',
    message: '',
    marketingConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally you'd send the formData to an API here
    setShowModal(true); // show success modal
  };

  return (
    <div className="container py-5">
      <div className="row rounded shadow">
        {/* LEFT COLUMN */}
        <div className="col-md-6 p-4 bg-contact-left">
          <h2 className="fw-bold">Contact Morent</h2>
          <p className="mb-3">
            Questions about vehicles, technical, or pricing? Need a test drive? Our sales experts are ready to help.
          </p>
          <p className="fw-bold">Talk with our team</p>
          <p className="mb-5">
            +1 (855) 747 6767 | <a href="mailto:support@morent.com">support@morent.com</a>
          </p>
          <img
            src="./img/contact-image.webp"
            alt="Contact support"
            className="img-fluid rounded margin"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-6 bg-contact-right p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Business email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Type of query</label>
                <select
                  className="form-select"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                >
                  <option value="">Select your query</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="pricing">Pricing</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Your message *</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleChange}
                  />
                <div className="form-check d-flex align-items-start p-0">               
                  <label className="form-check-label" htmlFor="marketingCheckbox">
                    I would like to receive marketing communications related to Morent's business,
                    services, and events. I can unsubscribe at any time.
                  </label>
                </div>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </div>
              <div className="col-12 text-muted text-center small mt-2 pb-3">
                By clicking Submit, I accept the Freshworks <a href="#">Terms of Service</a> and <a href="#">Privacy Notice</a>.
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your message has been successfully submitted. Our team will get back to you shortly!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactPage;
