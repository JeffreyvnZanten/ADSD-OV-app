// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dummy station data met perrons en uitgangen voor elke combinatie
const stations = [
    { id: 1, name: 'Station Amsterdam Centraal', code: 'AMS', city: 'Amsterdam', platform: 'Perron 5', exit: 'Hoofduitgang' },
    { id: 2, name: 'Station Rotterdam Centraal', code: 'RTD', city: 'Rotterdam', platform: 'Perron 3', exit: 'Noorduitgang' },
    { id: 3, name: 'Station Utrecht Centraal', code: 'UTC', city: 'Utrecht', platform: 'Perron 12', exit: 'Zuiduitgang' },
    { id: 4, name: 'Station Den Haag Centraal', code: 'DHG', city: 'Den Haag', platform: 'Perron 7', exit: 'Westuitgang' },
    { id: 5, name: 'Station Eindhoven Centraal', code: 'EHV', city: 'Eindhoven', platform: 'Perron 2', exit: 'Oostuitgang' },
    { id: 6, name: 'Station Arnhem Centraal', code: 'ARN', city: 'Arnhem', platform: 'Perron 1', exit: 'Hoofduitgang' }
];

// Root route
app.get('/', (req, res) => {
    res.send('Welkom bij de OV API! Ga naar /stations voor stationsinformatie.');
});

// Endpoint om stations te krijgen
app.get('/stations', (req, res) => {
    res.json(stations);
});

// Endpoint om een unieke route te genereren voor elke stationscombinatie
app.post('/route', (req, res) => {
    const { departureStation, arrivalStation } = req.body;

    // Zoek vertrek- en aankomststations in de dummydata
    const departure = stations.find(station => station.name === departureStation);
    const arrival = stations.find(station => station.name === arrivalStation);

    // Controleer of beide stations geldig zijn
    if (!departure || !arrival) {
        return res.status(400).json({ error: 'Beide stations moeten geldig zijn.' });
    }

    // Controleer of de vertrek- en aankomststations verschillend zijn
    if (departure.name === arrival.name) {
        return res.status(400).json({ error: 'Vertrek- en aankomststation moeten verschillend zijn.' });
    }

    // Simuleer een unieke route tussen de twee stations
    const route = {
        departure: departure.name,
        arrival: arrival.name,
        steps: [
            `Ga naar ${departure.platform} bij ${departure.name}.`,
            `Neem de trein naar ${arrival.name}.`,
            `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
        ]
    };

    // Return de gegenereerde route
    res.json(route);
});

// Server laten luisteren op poort 5000
const PORT = 4008;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
