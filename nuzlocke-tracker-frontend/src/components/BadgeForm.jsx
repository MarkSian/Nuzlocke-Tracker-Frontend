import { useAtom } from 'jotai';
import { currentRunAtom, newBadgeAtom } from '../atoms/index';
import axiosInstance from '../api/connector';

const BadgeForm = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newBadge, setNewBadge] = useAtom(newBadgeAtom);

    const handleAddBadge = async () => {
        if (!newBadge.trim()) return;
        try {
            const updatedRun = {
                ...currentRun,
                badges: [...currentRun.badges, newBadge.trim()]
            };
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewBadge('');
        } catch (err) {
            console.error('Failed to add badge:', err);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary mb-2">Badges Earned</h3>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="Badge Name"
                    className="input input-bordered input-sm"
                />
                <button onClick={handleAddBadge} className="btn btn-sm btn-accent">Add</button>
            </div>
            <ul className="list-disc list-inside">
                {currentRun.badges.map((badge, idx) => (
                    <li key={idx}>{badge}</li>
                ))}
            </ul>
        </div>
    );
};

export default BadgeForm;
