import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ArticlesList from './components/ArticlesList.jsx';
import IndividualArticleCard from './components/ArticleCard.jsx';

function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <Link to="/">
            <Header />
          </Link>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ArticlesList />} />
            <Route path="/article/:id" element={<IndividualArticleCard />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
