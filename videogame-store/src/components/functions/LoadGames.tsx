import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadGames } from '../../hooks/videogameSlice'; // Adjust the import path as
import type { AppDispatch } from '../store';
const LoadGames: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchGames = async () => {
            console.log('Cargando juegos...');
            await dispatch(loadGames()); // Wait for the loadGames action to complete
            console.log('Juegos cargados con éxito');
        };

        fetchGames(); // Call the async function
    }, [dispatch]); // Add dispatch to the dependency array

    return null; // This component does not render anything
};

export default LoadGames;
