import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentRunAtom } from '../atoms';
import axiosInstance from '../api/connector';
import Navbar from '../components/Navbar';
import EncounterCard from '../components/EncounterCard';

const BoxPage = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom); // Where current run data is stored

    // Fetch the current run data
    useEffect(() => {
        const fetchRun = async () => {
            try {
                // fetch the current run data
                const res = await axiosInstance.get('/nuzlocke/runs');
                if (res.data.length > 0) { // Check if there are any runs
                    setCurrentRun(res.data[0]); //  if there are any runs, set the first one as current
                }
            } catch (err) {
                console.error('Error fetching current run:', err);
            }
        };
        if (!currentRun) fetchRun();
    }, [currentRun, setCurrentRun]);

    // Filters the encounters to get only those with the status captured
    const boxPokemon = currentRun?.encounters?.filter(mon => mon.status === 'Captured') || []; // optional chaining to avoid erros if currentRun is undefined

    return (
        <div className="p-4">
            <Navbar />
            <h2 className="text-xl font-bold mb-4">Boxed Pokémon</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/*Takes the boxPokemon array and maps over it to create an EncounterCard for each Pokemon*/}
                {boxPokemon.length > 0 ? (
                    boxPokemon.map((mon, index) => (
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