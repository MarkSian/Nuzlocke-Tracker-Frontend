import { useAtom } from 'jotai';
import { currentRunAtom, newRivalAtom } from '../atoms/index';
import axiosInstance from '../api/connector';

const RivalForm = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newRival, setNewRival] = useAtom(newRivalAtom);

    const handleAddRival = async () => {
        if (!newRival.trim()) return;
        try {
            const updatedRun = {
                ...currentRun,
                rivalsDefeated: [...currentRun.rivalsDefeated, newRival.trim()]
            };
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewRival('');
        } catch (err) {
            console.error('Failed to add rival:', err);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary mb-2">Rivals Defeated</h3>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={newRival}
                    onChange={(e) => setNewRival(e.target.value)}
                    placeholder="Rival Name"
                    className="input input-bordered input-sm"
                />
                <button onClick={handleAddRival} className="btn btn-sm btn-accent">Add</button>
            </div>
            <ul className="list-disc list-inside">
                {currentRun.rivalsDefeated.map((rival, idx) => (
                    <li key={idx}>{rival}</li>
                ))}
            </ul>
        </div>
    );
};

export default RivalForm;
