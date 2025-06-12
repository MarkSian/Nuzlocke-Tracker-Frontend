import { useAtom } from 'jotai';
import { currentRunAtom, newRunGameAtom } from '../atoms';
import { useState } from 'react';
import axiosInstance from '../api/connector';

const RunList = ({ runs, setRuns }) => {
    const [, setCurrentRun] = useAtom(currentRunAtom);
    const [newGameVersion, setNewGameVersion] = useAtom(newRunGameAtom);
    const [newRunName, setNewRunName] = useState('');

    const handleSelectRun = (run) => {
        setCurrentRun(run);
    };

    const handleCreateRun = async () => {
        try {
            const newRun = {
                gameVersion: newGameVersion,
                runName: newRunName, // allow user to name the run
                currentRoute: '',
                encounters: [],
                boxPokemon: [],
                gravePokemon: [],
                badges: [],
                rivalsDefeated: [],
                bossesDefeated: []
            };

            const res = await axiosInstance.post('/nuzlocke/runs', newRun);
            setRuns(prev => [...prev, res.data]);
            setNewGameVersion('');
            setNewRunName('');
        } catch (err) {
            alert('Failed to create run.');
        }
    };

    const handleDeleteRun = async (id) => {
        try {
            await axiosInstance.delete(`/nuzlocke/runs/${id}`);
            setRuns(prev => prev.filter(run => run._id !== id));
        } catch (err) {
            alert('Failed to delete run.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-primary">Your Nuzlocke Runs</h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Game Version"
                    value={newGameVersion}
                    onChange={(e) => setNewGameVersion(e.target.value)}
                    className="input input-bordered input-primary w-48"
                />
                <input
                    type="text"
                    placeholder="Run Name"
                    value={newRunName}
                    onChange={(e) => setNewRunName(e.target.value)}
                    className="input input-bordered input-primary w-48"
                />
                <button onClick={handleCreateRun} className="btn btn-success">Create Run</button>
            </div>
            <div className="flex flex-wrap gap-4">
                {runs.map(run => (
                    <div key={run._id} className="flex items-center gap-2">
                        <button
                            onClick={() => handleSelectRun(run)}
                            className="btn btn-primary"
                        >
                            {run.runName || 'Unnamed Run'} - {run.gameVersion}
                        </button>
                        <button
                            onClick={() => handleDeleteRun(run._id)}
                            className="btn btn-sm btn-error"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RunList;