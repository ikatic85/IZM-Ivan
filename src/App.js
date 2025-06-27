import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gutenberg.css';
import './App.css';
import Automobili from './components/pages/Automobili'; 
import Blog from './components/pages/Blog';
import BlogSingle from './components/pages/BlogSingle';

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>


      <Footer />

    </div>
    </Router>
  );
}

export default App;
