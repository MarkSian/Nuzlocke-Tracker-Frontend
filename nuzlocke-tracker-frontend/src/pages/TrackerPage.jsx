import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentRunAtom, userAtom, loadingAtom } from '../atoms';
import axiosInstance from '../api/connector';
import Navbar from '../components/Navbar';


const TrackerPage = () => {
    const [user] = useAtom(userAtom);
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [, setLoading] = useAtom(loadingAtom);

    // Fetch the current Nuzlocke run on component mount
    useEffect(() => {
        const fetchCurrentRun = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/nuzlocke/runs', { withCredentials: true });
                if (res.data.length > 0) {
                    setCurrentRun(res.data[0]); // For now, just use the first run
                } else {
                    setCurrentRun(null);
                }
            } catch (err) {
                console.error('Failed to fetch Nuzlocke run:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCurrentRun();
        }
    }, [user, setCurrentRun, setLoading]);

    return (
        <div className="min-h-screen bg-base-200 p-4">
            <Navbar />
            <h1 className="text-2xl font-bold text-primary mb-4">Nuzlocke Tracker</h1>
            {currentRun ? (
                <div className="space-y-4">
                    <p className="text-base-content">Game Version: {currentRun.gameVersion}</p>
                    <p className="text-base-content">Current Route: {currentRun.currentRoute || 'N/A'}</p>
                    <div>
                        <h2 className="text-xl font-semibold text-secondary">Starter Pokémon</h2>
                        {currentRun.starterPokemon?.id && (
                            <div className="flex items-center gap-4">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentRun.starterPokemon.id}.png`}
                                    alt={currentRun.starterPokemon.name}
                                    className="w-16 h-16"
                                />
                                <p className="text-base-content">{currentRun.starterPokemon.name}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-secondary">Captured Encounters</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {currentRun.encounters.map((enc) => (
                                <div key={enc._id} className="card bg-base-100 shadow border border-primary">
                                    <figure>
                                        <img src={enc.image} alt={enc.pokemonName} className="w-20 h-20 mt-2" />
                                    </figure>
                                    <div className="card-body p-4">
                                        <h3 className="card-title text-base-content">{enc.nickname || enc.pokemonName}</h3>
                                        <p className="text-sm text-base-content">Route: {enc.routeName}</p>
                                        <p className="text-sm text-base-content">Nature: {enc.nature}</p>
                                        <p className="text-sm text-base-content">Status: {enc.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-secondary">Badges Earned</h2>
                        <ul className="list-disc list-inside text-base-content">
                            {currentRun.badges.map((badge, index) => (
                                <li key={index}>{badge}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-secondary">Rivals Defeated</h2>
                        <ul className="list-disc list-inside text-base-content">
                            {currentRun.rivalsDefeated.map((rival, index) => (
                                <li key={index}>{rival}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-secondary">Bosses Defeated</h2>
                        <ul className="list-disc list-inside text-base-content">
                            {currentRun.bossesDefeated.map((boss, index) => (
                                <li key={index}>{boss}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-base-content">No active Nuzlocke run found.</p>
            )}
        </div>
    );
};


export default TrackerPage;