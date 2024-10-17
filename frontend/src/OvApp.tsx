import React from 'react';
import useOvApp from './hooks/useOvApp'; 

function OVApp() {
    const {
        stations,
        departureStation,
        arrivalStation,
        route,
        handleDepartureChange,
        handleArrivalChange,
        handleGetRoute,
        handleReset
    } = useOvApp(); 

    return(
        <div>
        <h1>OV Stations Selector</h1>
        <div>
            <label>Vertrekstation:</label>
            <select value={departureStation} onChange={handleDepartureChange}>
                <option value="">-- Selecteer vertrekstation --</option>
                {stations.map((station) => (
                    <option key={station.id} value={station.name}>
                        {station.name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label>Aankomststation:</label>
            <select value={arrivalStation} onChange={handleArrivalChange}>
                <option value="">-- Selecteer aankomststation --</option>
                {stations.map((station) => (
                    <option key={station.id} value={station.name}>
                        {station.name}
                    </option>
                ))}
            </select>
        </div>
        <button onClick={handleGetRoute}>Genereer Route</button>
        <button onClick={handleReset} style={{ marginTop: '10px', backgroundColor: 'green' }}>Reset</button>

        {route && (
            <div className="route">
                <h2>Route van {route.departure} naar {route.arrival}:</h2>
                <ol>
                    {route.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        )}
        </div>
    );
}

export default OVApp;