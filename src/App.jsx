import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ArticlesList from './components/ArticlesList.jsx';
import IndividualArticleCard from './components/ArticleCard.jsx';
import TopicArticlesList from './components/TopicArticlesList.jsx'; 
import NavigationButtons from './components/NavigationButtons.jsx';

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
          <NavigationButtons />
          <Routes>
            <Route path="/" element={<ArticlesList />} />
            <Route path="/article/:id" element={<IndividualArticleCard />} />
            <Route path="/cooking" element={<TopicArticlesList topic="cooking" />} />
            <Route path="/coding" element={<TopicArticlesList topic="coding" />} />
            <Route path="/football" element={<TopicArticlesList topic="football" />} />
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
