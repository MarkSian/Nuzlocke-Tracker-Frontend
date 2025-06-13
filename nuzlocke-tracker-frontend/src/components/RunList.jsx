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
                runName: newRunName,
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-primary">Your Nuzlocke Runs</h1>
            <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
                <input
                    type="text"
                    placeholder="Game Version"
                    value={newGameVersion}
                    onChange={(e) => setNewGameVersion(e.target.value)}
                    className="input input-bordered input-primary w-48 bg-base-100 border-2 border-primary"
                />
                <input
                    type="text"
                    placeholder="Run Name"
                    value={newRunName}
                    onChange={(e) => setNewRunName(e.target.value)}
                    className="input input-bordered input-primary w-48 bg-base-100 border-2 border-primary"
                />
                <button onClick={handleCreateRun} className="btn btn-success">
                    Create Run
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {runs.map(run => (
                    <div
                        key={run._id}
                        className="card bg-base-100 border-2 border-primary shadow-xl rounded-box p-6 flex flex-col items-center transition-transform hover:scale-105 w-full max-w-xs mx-auto"
                    >
                        <div className="card-body w-full flex flex-col items-center">
                            <h2 className="card-title text-lg font-semibold text-primary mb-2">{run.runName || 'Unnamed Run'}</h2>
                            <p className="text-base-content mb-4">{run.gameVersion}</p>
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => handleSelectRun(run)}
                                    className="btn btn-primary btn-sm"
                                >
                                    Select
                                </button>
                                <button
                                    onClick={() => handleDeleteRun(run._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RunList;