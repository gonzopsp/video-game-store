import axios from 'axios';
import type { videogame } from './types/types'; // Adjust the path as necessary

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'


export const fetchVideogameData = async (): Promise<videogame[]> => {
    console.log('fetching')
    try {
        const response = await axios.get<videogame[]>(`${API_BASE}/api/videogame`);
        console.log('datos: ',response.data); // Handle the response data
        return response.data; // Return the array of videogames
    } catch (error) {
        console.error('Error fetching data:', error); // Handle errors
        return []; // Return an empty array in case of error
    }
};
