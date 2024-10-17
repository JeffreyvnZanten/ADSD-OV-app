
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const stations = [
    { id: 1, name: 'Station Amsterdam Centraal', code: 'AMS', city: 'Amsterdam', platform: 'Perron 5', exit: 'Hoofduitgang' },
    { id: 2, name: 'Station Rotterdam Centraal', code: 'RTD', city: 'Rotterdam', platform: 'Perron 3', exit: 'Noorduitgang' },
    { id: 3, name: 'Station Utrecht Centraal', code: 'UTC', city: 'Utrecht', platform: 'Perron 12', exit: 'Zuiduitgang' },
    { id: 4, name: 'Station Den Haag Centraal', code: 'DHG', city: 'Den Haag', platform: 'Perron 7', exit: 'Westuitgang' },
    { id: 5, name: 'Station Eindhoven Centraal', code: 'EHV', city: 'Eindhoven', platform: 'Perron 2', exit: 'Oostuitgang' },
    { id: 6, name: 'Station Arnhem Centraal', code: 'ARN', city: 'Arnhem', platform: 'Perron 1', exit: 'Hoofduitgang' }
];


app.get('/', (req, res) => {
    res.send('Welkom bij de OV API! Ga naar /stations voor stationsinformatie.');
});


app.get('/stations', (req, res) => {
    res.json(stations);
});

app.post('/route', (req, res) => {
    const { departureStation, arrivalStation } = req.body;

    const departure = stations.find(station => station.name === departureStation);
    const arrival = stations.find(station => station.name === arrivalStation);

    if (!departure || !arrival) {
        return res.status(400).json({ error: 'Beide stations moeten geldig zijn.' });
    }

    if (departure.name === arrival.name) {
        return res.status(400).json({ error: 'Vertrek- en aankomststation moeten verschillend zijn.' });
    }

    const route = {
        departure: departure.name,
        arrival: arrival.name,
        steps: [
            `Ga naar ${departure.platform} bij ${departure.name}.`,
            `Neem de trein naar ${arrival.name}.`,
            `Bij aankomst op ${arrival.name}, ga naar de ${arrival.exit} om het station te verlaten.`
        ]
    };

    res.json(route);
});


const PORT = 4010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
