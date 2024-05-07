import React from 'react';
import Header from './Components/Header';
import './App.css';
import Footer from './Components/Footer';
import ArticlesList from './Components/ArticlesList';

function App() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="main-content"> 
        <ArticlesList /> 
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
