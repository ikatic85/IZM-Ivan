
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './gutenberg.css';
import './App.css';
import Automobili from './components/pages/Automobili'; 
import Blog from './components/pages/Blog';
import BlogSingle from './components/pages/BlogSingle';
import BlogCard from './components/parts/BlogCard.js';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import Home from './components/pages/Home';
import Category from './components/pages/Category';
import Detail from './components/pages/Detail';
import Payment from './components/pages/Payment';
import Admin from './components/pages/Admin';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import CarFilterSidebar from './components/parts/FilterSidebar.js';
import RentalSummary from './components/parts/RentalSummary';
import CarCard from './components/parts/CarCard.js';
import Banners from './components/parts/Banners.js';
import ContactPage from './components/pages/ContactPage.js';
import AboutUs from './components/pages/AboutUs.js';
import TestimonialSlider from './components/parts/TestimonialSlider.js';


function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/automobili" element={<Automobili />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogSingle />} />
        <Route path="/blog-card" element={<BlogCard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/filter" element={<CarFilterSidebar />} />
        <Route path="/rental-summary" element={<RentalSummary />} />
        <Route path="/car-card" element={<CarCard />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/testimonials" element={<TestimonialSlider />} />
      </Routes>


      <Footer />

    </div>
    </Router>
  );
}

export default App;


