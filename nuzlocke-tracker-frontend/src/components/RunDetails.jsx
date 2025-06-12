import { useAtom } from 'jotai';
import { currentRunAtom, modifiedEncountersAtom, newEncounterAtom } from '../atoms';
import EncounterCard from './EncounterCard';
import PokemonSelect from './PokemonSelect';
import { useState } from 'react';
import axiosInstance from '../api/connector';

const RunDetails = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newEncounter, setNewEncounter] = useAtom(newEncounterAtom);
    const [, setModifiedEncounters] = useAtom(modifiedEncountersAtom);
    const [error, setError] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingEncounter, setEditingEncounter] = useState(null);

    if (!currentRun) return <p className="text-gray-500">Select a run to view details.</p>;

    const handleAddEncounter = async () => {
        try {
            const updatedRun = {
                ...currentRun,
                encounters: [...currentRun.encounters, {
                    ...newEncounter,
                    status: newEncounter.status || 'Captured'
                }],
                currentRoute: newEncounter.routeName
            };

            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewEncounter({ routeName: '', pokemonName: '', nickname: '', nature: '', level: '', pokemonId: '', image: '', status: '' });
            setModifiedEncounters([]);
        } catch (err) {
            setError('Failed to add encounter.');
        }
    };

    const handleEditEncounter = async () => {
        try {
            const updatedEncounters = [...currentRun.encounters];
            updatedEncounters[editingIndex] = {
                ...editingEncounter,
                status: editingEncounter.status || 'Captured'
            };

            const updatedRun = {
                ...currentRun,
                encounters: updatedEncounters,
                currentRoute: editingEncounter.routeName
            };

            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setEditingIndex(null);
            setEditingEncounter(null);
        } catch (err) {
            setError('Failed to update encounter.');
        }
    };

    const handleDeleteEncounter = async (index) => {
        try {
            const updatedEncounters = currentRun.encounters.filter((_, i) => i !== index);
            const updatedRun = {
                ...currentRun,
                encounters: updatedEncounters,
                currentRoute: updatedEncounters.length > 0 ? updatedEncounters[updatedEncounters.length - 1].routeName : ''
            };
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
        } catch (err) {
            setError('Failed to delete encounter.');
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-secondary">Run Details</h2>
            <p><strong>Run Name:</strong> {currentRun.runName || 'Unnamed Run'}</p>
            <p><strong>Game Version:</strong> {currentRun.gameVersion}</p>
            <p><strong>Current Route:</strong> {currentRun.currentRoute || 'Not set'}</p>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-primary">{editingIndex !== null ? 'Edit Encounter' : 'Add Encounter'}</h3>
                <div className="flex gap-2 flex-wrap mt-2">
                    <input
                        type="text"
                        placeholder="Route Name"
                        value={editingIndex !== null ? editingEncounter.routeName : newEncounter.routeName}
                        onChange={(e) => {
                            const value = e.target.value;
                            editingIndex !== null
                                ? setEditingEncounter({ ...editingEncounter, routeName: value })
                                : setNewEncounter({ ...newEncounter, routeName: value });
                        }}
                        className="input input-bordered input-sm w-40"
                    />
                    <PokemonSelect editing={editingIndex !== null} />
                    <input
                        type="text"
                        placeholder="Nickname (optional)"
                        value={editingIndex !== null ? editingEncounter.nickname : newEncounter.nickname}
                        onChange={(e) => {
                            const value = e.target.value;
                            editingIndex !== null
                                ? setEditingEncounter({ ...editingEncounter, nickname: value })
                                : setNewEncounter({ ...newEncounter, nickname: value });
                        }}
                        className="input input-bordered input-sm w-40"
                    />
                    <input
                        type="text"
                        placeholder="Nature"
                        value={editingIndex !== null ? editingEncounter.nature : newEncounter.nature}
                        onChange={(e) => {
                            const value = e.target.value;
                            editingIndex !== null
                                ? setEditingEncounter({ ...editingEncounter, nature: value })
                                : setNewEncounter({ ...newEncounter, nature: value });
                        }}
                        className="input input-bordered input-sm w-32"
                    />
                    <input
                        type="number"
                        placeholder="Level"
                        value={editingIndex !== null ? editingEncounter.level : newEncounter.level || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            editingIndex !== null
                                ? setEditingEncounter({ ...editingEncounter, level: value })
                                : setNewEncounter({ ...newEncounter, level: value });
                        }}
                        className="input input-bordered input-sm w-24"
                    />
                    <select
                        className="select select-bordered select-sm w-32"
                        value={editingIndex !== null ? editingEncounter.status || 'Captured' : newEncounter.status || 'Captured'}
                        onChange={(e) => {
                            const value = e.target.value;
                            editingIndex !== null
                                ? setEditingEncounter({ ...editingEncounter, status: value })
                                : setNewEncounter({ ...newEncounter, status: value });
                        }}
                    >
                        <option value="Captured">Captured</option>
                        <option value="Fainted">Fainted</option>
                        <option value="Skipped">Skipped</option>
                    </select>
                    {editingIndex !== null ? (
                        <button onClick={handleEditEncounter} className="btn btn-sm btn-warning">Update</button>
                    ) : (
                        <button onClick={handleAddEncounter} className="btn btn-sm btn-success">Add</button>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-2">Encounters</h3>
                {currentRun.encounters.length === 0 ? (
                    <p className="text-gray-400">No encounters yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentRun.encounters.map((enc, index) => (
                            <div key={enc._id || index} className="relative">
                                <EncounterCard encounter={enc} />
                                <div className="absolute top-1 right-1 flex gap-1">
                                    <button
                                        className="btn btn-xs btn-warning"
                                        onClick={() => {
                                            setEditingIndex(index);
                                            setEditingEncounter(enc);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() => handleDeleteEncounter(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RunDetails;
