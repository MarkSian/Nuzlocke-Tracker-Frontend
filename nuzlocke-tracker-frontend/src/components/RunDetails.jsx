import { useAtom } from 'jotai';
import { currentRunAtom, newEncounterAtom } from '../atoms';
import EncounterCard from './EncounterCard';
import EncounterForm from './EncounterForm';
import { useState } from 'react';
import axiosInstance from '../api/connector';
import RivalForm from './RivalForm';
import BadgeForm from './BadgeForm';
import BossForm from './BossForm';

const RunDetails = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newEncounter, setNewEncounter] = useAtom(newEncounterAtom);
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

            <EncounterForm
                editingIndex={editingIndex}
                editingEncounter={editingEncounter}
                setEditingEncounter={setEditingEncounter}
                setNewEncounter={setNewEncounter}
                handleAddEncounter={handleAddEncounter}
                handleEditEncounter={handleEditEncounter}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

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

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-primary">Additional Progress</h3>
                <RivalForm />
                <BadgeForm />
                <BossForm />
            </div>
        </div>
    );
};

export default RunDetails;
