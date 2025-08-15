import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames } from '../../hooks/videogameSlice';
import type { AppDispatch, RootState } from '../store';

const LoadGames: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.videogame.status);
    const error = useSelector((state: RootState) => state.videogame.error);

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    if (status === 'loading') {
        return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando juegos...</div>;
    }

    if (status === 'failed') {
        return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: {error}</div>;
    }

    return null; // Cuando está succeeded o idle no renderiza nada
};

export default LoadGames;
