import React from 'react';

import LocatieVan from './components/LocatieVan';
import LocatieNaar from './components/LocatieNaar';
import VervoersmiddelenKeuzeSelectie from "./components/VervoersmiddelenKeuzeSelectie";
import UitkomstReisAdvies from './components/UitkomstReisAdvies';

function App() {
  return (
    <div id="container">
      <LocatieVan />
      <LocatieNaar />
      <VervoersmiddelenKeuzeSelectie />
      <UitkomstReisAdvies />
    </ div>
  );
}

export default App;