import React, { useState, useEffect } from 'react';
import RentalSummary from '../parts/RentalSummary';

const RentalForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffLocation: '',
    dropoffDate: '',
    dropoffTime: '',
    cardNumber: '',
    expiration: '',
    holder: '',
    cvc: '',
    marketingConsent: false,
    termsConsent: false,
    paymentMethod: 'card',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Neuspješno slanje. Pokušajte ponovno.');
      }

      const result = await response.json();
      setMessage('Uspješno poslano! Hvala na rezervaciji.');
      setMessageType('success');

      setFormData({
        name: '',
        phone: '',
        address: '',
        city: '',
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        dropoffLocation: '',
        dropoffDate: '',
        dropoffTime: '',
        cardNumber: '',
        expiration: '',
        holder: '',
        cvc: '',
        marketingConsent: false,
        termsConsent: false,
        paymentMethod: 'card',
      });
    } catch (error) {
      setMessage('Došlo je do pogreške: ' + error.message);
      setMessageType('error');
    }
  };

  return (
    <section class="container">
      <div class="row flex-layout">
        <div className="col-md-8 col-12">
          <form onSubmit={handleSubmit}>
            {message && (
              <div className={`alert alert-${messageType === 'success' ? 'success' : 'danger'} text-center`} role="alert">
                {message}
              </div>
            )}

            {/* Step 1: Billing Info */}
            <div className="row form-section form-column">
              <h4>Billing info</h4>
              <div className="form-header">
                <p>Please enter your billing info</p>
                <p>Step 1 of 4</p>
              </div>
              <div className="container rental-form">
                <div className="form-group">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="city">Town / City</label>
                    <input type="text" id="city" name="city" placeholder="Town or city" value={formData.city} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Rental Info */}
            <div className="row form-section">
              <h4>Rental info</h4>
              <div className="form-header">
                <p>Please select your rental date</p>
                <p>Step 2 of 4</p>
              </div>
              <div className="container rental-form">
                <p>Pick-Up</p>
                <div className="form-group d-flex">
                  <div className="form-field">
                    <label>Locations</label>
                    <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange}>
                      <option>Select your city</option>
                      <option value="zagreb">Zagreb</option>
                      <option value="rijeka">Rijeka</option>
                      <option value="split">Split</option>
                      <option value="osijek">Osijek</option>
                      <option value="dubrovnik">Dubrovnik</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} />
                  </div>
                  <div className="form-field time col-md-6">
                    <label>Time</label>
                    <input type="time" name="pickupTime" value={formData.pickupTime} onChange={handleChange} />
                  </div>
                </div>
                <p>Drop-Off</p>
                <div className="form-group">
                  <div className="form-field">
                    <label>Locations</label>
                    <select name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange}>
                      <option>Select your city</option>
                      <option value="zagreb">Zagreb</option>
                      <option value="rijeka">Rijeka</option>
                      <option value="split">Split</option>
                      <option value="osijek">Osijek</option>
                      <option value="dubrovnik">Dubrovnik</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Date</label>
                    <input type="date" name="dropoffDate" value={formData.dropoffDate} onChange={handleChange} />
                  </div>
                  <div className="form-field time">
                    <label>Time</label>
                    <input type="time" name="dropoffTime" value={formData.dropoffTime} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="row form-section payment">
              <h4>Payment Method</h4>
              <div className="form-header">
                <p>Please enter your payment method</p>
                <p>Step 3 of 4</p>
              </div>
              <div className="container rental-form card-bg card-form">
                <div className="d-flex c-card">
                  <span>
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} /> Credit Card
                  </span>
                  <span className="visa"><img src="img/visa_inc_logo.svg" alt="Visa" /></span>
                  <span><img src="img/mc.svg" alt="Mastercard" /></span>
                </div>
                <div className="form-group">
                  <div className="form-field">
                    <label htmlFor="card-number">Card Number</label>
                    <input type="text" id="card-number" name="cardNumber" placeholder="Card number" value={formData.cardNumber} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="expiration">Expiration Date</label>
                    <input type="text" id="expiration" name="expiration" placeholder="DD/MM/YY" value={formData.expiration} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="holder">Card Holder</label>
                    <input type="text" id="holder" name="holder" placeholder="Card holder" value={formData.holder} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cvc">CVC</label>
                    <input type="text" id="cvc" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="paypal d-flex">
                    <span><input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} /> PayPal</span>
                    <span><img src="img/paypal.svg" alt="PayPal" /></span>
                  </div>
                  <div className="bitcoin d-flex mb-0">
                    <span><input type="radio" name="paymentMethod" value="bitcoin" checked={formData.paymentMethod === 'bitcoin'} onChange={handleChange} /> Bitcoin</span>
                    <span><img src="img/bitcoin.svg" alt="Bitcoin" /></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Confirmation */}
            <div className="row form-section">
              <h4>Confirmation</h4>
              <div className="form-header">
                <p>We are getting to the end. Just few clicks and your rental is ready!</p>
                <p>Step 4 of 4</p>
              </div>
              <div className="container">
                <div className="row">
                  <div className="paypal check d-flex">
                    <span>
                      <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} />
                      <b>I agree with sending marketing and newsletter emails. No spam, promised!</b>
                    </span>
                  </div>
                  <div className="bitcoin check d-flex">
                    <span>
                      <input type="checkbox" name="termsConsent" checked={formData.termsConsent} onChange={handleChange} />
                      <b>I agree with our terms and conditions and privacy policy.</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="car-button">
                <button type="submit" className="btn btn-primary button">Rent Now</button>
              </div>
              <div className="container data">
                <span><img src="img/ic-security-safety.svg" alt="Security" /></span>
                <p className="data-p1"><b>All your data are safe</b></p>
                <p className="data-p2">We are using the most advanced security to provide you the best experience ever</p>
              </div>
            </div>
          </form>
        </div>
        
        <RentalSummary colClass="col-12 col-md-4"/>
        
      </div>
    </section>  
  );
};

export default RentalForm;
