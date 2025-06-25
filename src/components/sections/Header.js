import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="#" className="navbar-brand order-2 order-lg-1">
            <img src="img/morent-logo.svg" />
          </a>
          <button className="navbar-toggler order-1 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="menu-icon">
				        <span></span>
                <span></span>
                <span></span>
			      </span>
          </button>
          <div className="collapse navbar-collapse main-nav order-lg-2" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 text-uppercase">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/category" className="nav-link" href="#">Category</Link>
              </li>
              <li className="nav-item">
                <Link to="/detail" className="nav-link" href="#">Detail</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link" href="#">Payment</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link" href="#">Admin</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link" href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav align-items-center mobile-menu order-3">
              <li className="nav-item">
                <a className="nav-link nav-icon" href="#">
                  <img src="img/heart-nav.svg" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-icon" href="#">
                  <img src="img/notification.svg" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-icon" href="#">
                  <img src="img/setting-2.svg" />
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="img/profil.svg" />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
        </div>
      </nav>
    </header>
    );
};
export default Header;
