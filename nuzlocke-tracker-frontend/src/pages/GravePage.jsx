import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentRunAtom } from '../atoms';
import axiosInstance from '../api/connector';
import Navbar from '../components/Navbar';
import EncounterCard from '../components/EncounterCard';

const GravePage = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);

    // Fetch the current run data 
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
    // Filters the encounters to get only those with the status fainted
    const faintedPokemon = currentRun?.encounters?.filter(mon => mon.status === 'Fainted') || []; // optional chaining to avoid erros if currentRun is undefined

    return (
        <div className="p-4">
            <Navbar />
            <h2 className="text-xl font-bold mb-4">Graveyard</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/*Takes the boxPokemon array and maps over it to create an EncounterCard for each Pokemon*/}
                {faintedPokemon.length > 0 ? (
                    faintedPokemon.map((mon, index) => (
                        <EncounterCard key={index} encounter={mon} />
                    ))
                ) : (
                    <p>No Pokémon have fainted.</p>
                )}
            </div>
        </div>
    );
};

export default GravePage;