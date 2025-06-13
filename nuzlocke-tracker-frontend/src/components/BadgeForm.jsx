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
            // put request to update the run with the new badge
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewBadge('');
        } catch (err) {
            console.error('Failed to add badge:', err);
        }
    };

    return (
        <div className="mt-7">
            <h3 className="text-lg font-semibold text-primary mb-2">Badges Earned</h3>
            <div className="mt-7 w-full flex justify-center mb-2">
                <div className="flex flex-row gap-4 items-center">
                    <input
                        type="text"
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        placeholder="Badge Name"
                        className="input input-bordered input-primary border-2 border-primary w-48 bg-base-100 text-base-content"
                    />
                    <button onClick={handleAddBadge} className="btn btn-accent w-32">Add</button>
                </div>
            </div>
            <ul className="mt-7 list-disc list-inside">
                {currentRun.badges.map((badge, id) => (
                    <li key={id}>{badge}</li>
                ))}
            </ul>
        </div>
    );
};

export default BadgeForm;
