import { useState, useEffect } from 'react';

interface Station {
    id: string | number;  // Adjust this type based on your actual data
    name: string;
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
            .then((data) => setStations(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDepartureChange = (event: any) => {
        const selectedStation = event.target.value; 
        setDepartureStation(selectedStation); 
        speak(`Vertrekstation is ingesteld op ${selectedStation}`); 
    };

    const handleArrivalChange = (event: any) => {
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
                .then((data) => {
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
    };

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-NL';
        window.speechSynthesis.speak(utterance);
    };

    // Return the values and functions
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