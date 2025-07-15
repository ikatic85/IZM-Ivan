import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a href="#" className="navbar-brand order-2 order-lg-1">
            <img src="img/morent-logo.svg" alt="Logo" />
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
                <Link to="/" className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/category" className="nav-link">Category</Link>
              </li>
              <li className="nav-item">
                <Link to="/detail" className="nav-link">Detail</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link">Payment</Link>
              </li>
              {role === "admin" && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/about-us" className="nav-link">About Us</Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav align-items-center mobile-menu order-3">
            <li className="nav-item">
              <a className="nav-link nav-icon" href="#">
                <img src="img/heart-nav.svg" alt="Heart" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-icon" href="#">
                <img src="img/notification.svg" alt="Notification" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-icon" href="#">
                <img src="img/setting-2.svg" alt="Settings" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="img/profil.svg" alt="Profil" />
                {username && <span className="d-none d-lg-inline ms-2">{username}</span>}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {username ? (
                  <>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

