import { useState, useEffect } from 'react';

interface Station {
    id: number;
    name: string;
    code: string;
    city: string;
    platform: string;
    exit: string;
}

interface Route {
    departure: string;
    arrival: string;
    steps: string[];
}

function useOvApp() {
    const [stations, setStations] = useState<Station[]>([]);
    const [departureStation, setDepartureStation] = useState('');
    const [arrivalStation, setArrivalStation] = useState('');
    const [route, setRoute] = useState<Route | null>(null);

    useEffect(() => {
        fetch('http://localhost:4010/stations')
            .then((response) => response.json())
            .then((data: Station[]) => setStations(data))
            .catch((error) => console.error('Error fetching stations:', error));
    }, []);

    const handleDepartureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStation = event.target.value;
        setDepartureStation(selectedStation);
        speak(`Vertrekstation is ingesteld op ${selectedStation}`);
    };

    const handleArrivalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStation = event.target.value;
        setArrivalStation(selectedStation);
        speak(`Aankomststation is ingesteld op ${selectedStation}`);
    };

    const handleGetRoute = () => {
        if (departureStation && arrivalStation) {
            fetch('http://localhost:4010/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    departureStation: departureStation,
                    arrivalStation: arrivalStation
                })
            })
                .then((response) => response.json())
                .then((data: Route) => {
                    setRoute(data);
                    speak(`De route van ${data.departure} naar ${data.arrival} is gegenereerd. ${data.steps.join(', ')}`);
                })
                .catch((error) => console.error('Error fetching route:', error));
        }
    };

    const handleReset = () => {
        setDepartureStation('');
        setArrivalStation('');
        setRoute(null);
        speak('De selectie is gereset');
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-NL';
        window.speechSynthesis.speak(utterance);
    };

    return {
        stations,
        departureStation,
        arrivalStation,
        route,
        handleDepartureChange,
        handleArrivalChange,
        handleGetRoute,
        handleReset
    };
}

export default useOvApp;