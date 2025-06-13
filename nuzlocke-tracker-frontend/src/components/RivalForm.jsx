import { useAtom } from 'jotai';
import { currentRunAtom, newRivalAtom } from '../atoms/index';
import axiosInstance from '../api/connector';

const RivalForm = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom); // bring in the current run data
    const [newRival, setNewRival] = useAtom(newRivalAtom); // could've been done with useState, but using atoms for consistency sake.

    const handleAddRival = async () => {
        if (!newRival.trim()) return;
        try {
            const updatedRun = {
                ...currentRun, // spread the existing run data so we don't lose any other properties
                rivalsDefeated: [...currentRun.rivalsDefeated, newRival.trim()] // spread the existing rivals and add the new one
            };
            // put request to update the run with the new rival
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewRival('');
        } catch (err) {
            console.error('Failed to add rival:', err);
        }
    };
    return (
        <div className="mt-7">
            <h3 className="text-lg font-semibold text-primary mb-2">Rivals Defeated</h3>
            <div className="mt-7 w-full flex justify-center mb-2">
                <div className="flex flex-row gap-4 items-center">
                    <input
                        type="text"
                        value={newRival}
                        onChange={(e) => setNewRival(e.target.value)}
                        placeholder="Rival Name"
                        className="input input-bordered input-primary border-2 border-primary w-48 bg-base-100 text-base-content"
                    />
                    <button onClick={handleAddRival} className="btn btn-accent w-32">Add</button>
                </div>
            </div>
            <ul className="list-disc list-inside mt-7">
                {currentRun.rivalsDefeated.map((rival, id) => (
                    <li key={id}>{rival}</li>
                ))}
            </ul>
        </div>
    );
};


export default RivalForm;
