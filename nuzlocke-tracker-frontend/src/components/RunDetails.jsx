import { useAtom } from 'jotai';
import { currentRunAtom, modifiedEncountersAtom, newEncounterAtom } from '../atoms';
import EncounterCard from './EncounterCard';
import { useState } from 'react';
import axiosInstance from '../api/connector';
import PokemonSelect from './PokemonSelect';

const RunDetails = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newEncounter, setNewEncounter] = useAtom(newEncounterAtom);
    const [, setModifiedEncounters] = useAtom(modifiedEncountersAtom);
    const [error, setError] = useState('');

    if (!currentRun) return <p className="text-gray-500">Select a run to view details.</p>;

    const handleAddEncounter = async () => {
        try {
            const updatedRun = {
                ...currentRun,
                encounters: [...currentRun.encounters, {
                    ...newEncounter,
                    status: 'Captured',
                    image: newEncounter.image
                }]
            };

            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewEncounter({ routeName: '', pokemonName: '', nickname: '', nature: '', level: '', pokemonId: '', image: '' });
            setModifiedEncounters([]);
        } catch (err) {
            setError('Failed to add encounter.');
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-secondary">Run Details</h2>
            <p><strong>Run Name:</strong> {currentRun.runName || 'Unnamed Run'}</p>
            <p><strong>Game Version:</strong> {currentRun.gameVersion}</p>
            <p><strong>Current Route:</strong> {currentRun.currentRoute || 'Not set'}</p>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-primary">Add Encounter</h3>
                <div className="flex gap-2 flex-wrap mt-2">
                    <input
                        type="text"
                        placeholder="Route Name"
                        value={newEncounter.routeName}
                        onChange={(e) => setNewEncounter({ ...newEncounter, routeName: e.target.value })}
                        className="input input-bordered input-sm w-40"
                    />
                    <PokemonSelect />
                    <input
                        type="text"
                        placeholder="Nickname (optional)"
                        value={newEncounter.nickname}
                        onChange={(e) => setNewEncounter({ ...newEncounter, nickname: e.target.value })}
                        className="input input-bordered input-sm w-40"
                    />
                    <input
                        type="text"
                        placeholder="Nature"
                        value={newEncounter.nature}
                        onChange={(e) => setNewEncounter({ ...newEncounter, nature: e.target.value })}
                        className="input input-bordered input-sm w-32"
                    />
                    <input
                        type="number"
                        placeholder="Level"
                        value={newEncounter.level || ''}
                        onChange={(e) => setNewEncounter({ ...newEncounter, level: e.target.value })}
                        className="input input-bordered input-sm w-24"
                    />
                    <button onClick={handleAddEncounter} className="btn btn-sm btn-success">Add</button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Encounters</h3>
                {currentRun.encounters.length === 0 ? (
                    <p className="text-gray-400">No encounters yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentRun.encounters.map((enc) => (
                            <EncounterCard key={enc._id} encounter={enc} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RunDetails;