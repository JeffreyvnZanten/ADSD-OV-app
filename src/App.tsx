import React, { useState } from 'react';
import './App.css'; // We will add CSS styles for light and dark mode

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="top-right">
        <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        <button className="button" onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default App;
