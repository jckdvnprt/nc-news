import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ArticlesList from './components/ArticlesList.jsx';
import IndividualArticleCard from './components/ArticleCard.jsx';
import TopicArticlesList from './components/TopicArticlesList.jsx'; 
import NavigationButtons from './components/NavigationButtons.jsx';

function TopicNotFound() {
  return <h2>404 - Topic Not Found</h2>;
}

function ArticleNotFound() {
  return <h2>404 - Article Not Found</h2>
}

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
            <Route path="*" element={<TopicNotFound />} />
            <Route path="/football" element={<TopicArticlesList topic="football" />} />
            <Route path="/article-not-found" element={<ArticleNotFound />} />
            
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
