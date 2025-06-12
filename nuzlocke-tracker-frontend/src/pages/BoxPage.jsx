import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentRunAtom } from '../atoms';
import axiosInstance from '../api/connector';
import Navbar from '../components/Navbar';
import EncounterCard from '../components/EncounterCard';

const BoxPage = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);

    // Fetch the current run data only if not already in memory
    useEffect(() => {
        const fetchRun = async () => {
            try {
                const res = await axiosInstance.get('/nuzlocke/runs');
                if (res.data.length > 0) {
                    setCurrentRun(res.data[0]); // Load the first run for now
                }
            } catch (err) {
                console.error('Error fetching current run:', err);
            }
        };
        if (!currentRun) fetchRun();
    }, [currentRun, setCurrentRun]);

    return (
        <div className="p-4">
            <Navbar />
            <h2 className="text-xl font-bold mb-4">Boxed Pokémon</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentRun?.boxPokemon?.length > 0 ? (
                    currentRun.boxPokemon.map((mon, index) => (
                        <EncounterCard key={index} encounter={mon} />
                    ))
                ) : (
                    <p>No Pokémon in the box.</p>
                )}
            </div>
        </div>
    );
};

export default BoxPage;