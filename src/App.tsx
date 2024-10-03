import React from 'react';

import DestinationSelection from './components/DepartureSelection';
import DepartureSelection from './components/DestinationSelection';
import TravelAdvice from './components/TravelAdvice';
import TransitModeSelection from './components/TransitModeSelection';

function App() {
  return (
    <div id="container">
      <DepartureSelection />
      <DestinationSelection />
      <TransitModeSelection />
      <TravelAdvice />
    </ div>
  );
}

export default App;