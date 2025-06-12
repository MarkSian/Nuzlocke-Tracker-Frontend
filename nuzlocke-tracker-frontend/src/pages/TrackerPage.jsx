import { useEffect, useState } from 'react';
import axiosInstance from '../api/connector';
import { useAtom } from 'jotai';
import { currentRunAtom, newRunGameAtom, newRunStarterAtom } from '../atoms';
import EncounterCard from '../components/EncounterCard';

const TrackerPage = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [gameVersion, setGameVersion] = useAtom(newRunGameAtom);
    const [starterPokemon, setStarterPokemon] = useAtom(newRunStarterAtom);

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                const res = await axiosInstance.get('/nuzlocke/runs');
                setRuns(res.data);
            } catch (err) {
                setError('Failed to load runs.');
            } finally {
                setLoading(false);
            }
        };

        fetchRuns();
    }, []);

    const handleSelectRun = (run) => {
        setCurrentRun(run);
    };

    const handleCreateRun = async () => {
        try {
            const res = await axiosInstance.post('/nuzlocke/runs', {
                gameVersion,
                starterPokemon: {
                    name: starterPokemon,
                    id: null // You can add a dropdown/search later to select and assign correct ID
                }
            });
            setRuns([...runs, res.data]);
            setCurrentRun(res.data);
            setGameVersion('');
            setStarterPokemon('');
        } catch (err) {
            alert('Failed to create run.');
        }
    };

    const handleDeleteRun = async (runId) => {
        try {
            await axiosInstance.delete(`/nuzlocke/runs/${runId}`);
            setRuns(runs.filter(run => run._id !== runId));
            if (currentRun?._id === runId) setCurrentRun(null);
        } catch (err) {
            alert('Failed to delete run.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-primary">Your Nuzlocke Runs</h1>

            <div className="flex gap-2 mb-6">
                <input
                    className="input input-bordered"
                    placeholder="Game Version"
                    value={gameVersion}
                    onChange={(e) => setGameVersion(e.target.value)}
                />
                <input
                    className="input input-bordered"
                    placeholder="Starter Pokémon"
                    value={starterPokemon}
                    onChange={(e) => setStarterPokemon(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleCreateRun}>Create Run</button>
            </div>

            {loading ? (
                <p>Loading runs...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : runs.length === 0 ? (
                <p className="text-gray-500">No runs yet. Start a new adventure!</p>
            ) : (
                <div className="flex flex-wrap gap-4 mb-6">
                    {runs.map(run => (
                        <div key={run._id} className="flex items-center gap-2">
                            <button
                                onClick={() => handleSelectRun(run)}
                                className={`btn ${currentRun?._id === run._id ? 'btn-secondary' : 'btn-primary'}`}
                            >
                                {run.gameVersion} - Starter: {run.starterPokemon?.name || 'Unknown'}
                            </button>
                            <button onClick={() => handleDeleteRun(run._id)} className="btn btn-sm btn-error">X</button>
                        </div>
                    ))}
                </div>
            )}

            {currentRun && (
                <div className="bg-base-200 p-4 rounded-lg shadow-md border border-primary">
                    <h2 className="text-xl font-semibold mb-2 text-accent">
                        Current Run: {currentRun.gameVersion}
                    </h2>

                    <div className="mb-2">
                        <strong>Starter:</strong> {currentRun.starterPokemon?.name || 'Unknown'}
                        {currentRun.starterPokemon?.id && (
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentRun.starterPokemon.id}.png`}
                                alt={currentRun.starterPokemon.name}
                                className="inline-block w-10 h-10 ml-2"
                            />
                        )}
                    </div>

                    <div className="mb-2">
                        <strong>Current Route:</strong> {currentRun.currentRoute}
                    </div>

                    <div className="mb-2">
                        <strong>Badges:</strong> {currentRun.badges.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {currentRun.badges.map((badge, i) => <li key={i}>{badge}</li>)}
                            </ul>
                        ) : ' None'}
                    </div>

                    <div className="mb-2">
                        <strong>Rivals Defeated:</strong> {currentRun.rivalsDefeated.join(', ') || 'None'}
                    </div>

                    <div className="mb-4">
                        <strong>Bosses Defeated:</strong> {currentRun.bossesDefeated.join(', ') || 'None'}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mt-4 text-secondary">Encounters</h3>
                        {currentRun.encounters.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                {currentRun.encounters.map((enc) => (
                                    <EncounterCard key={enc._id} encounter={enc} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No encounters yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackerPage;