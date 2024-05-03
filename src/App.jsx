import React from 'react';
import Header from './Components/Header';
import './App.css';
import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
