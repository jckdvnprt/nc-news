import React from 'react';
import { Link } from 'react-router-dom';
const NavigationButtons = () => {
  return (
    <div className="navigation-buttons">
      <Link to="/coding"> 
        <button>CODING💻</button>
      </Link>
      <Link to="/football"> 
        <button>FOOTBALL⚽️</button>
      </Link>
      <Link to="/cooking"> 
        <button>COOKING🍳</button>
      </Link>
    </div>
  );
}
export default NavigationButtons;
