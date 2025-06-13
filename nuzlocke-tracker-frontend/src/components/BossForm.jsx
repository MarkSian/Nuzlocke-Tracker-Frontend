import { useAtom } from 'jotai';
import { currentRunAtom, newBossAtom } from '../atoms/index';
import axiosInstance from '../api/connector';

const BossForm = () => {
    const [currentRun, setCurrentRun] = useAtom(currentRunAtom);
    const [newBoss, setNewBoss] = useAtom(newBossAtom);

    const handleAddBoss = async () => {
        if (!newBoss.trim()) return;
        try {
            const updatedRun = {
                ...currentRun,
                bossesDefeated: [...currentRun.bossesDefeated, newBoss.trim()]
            };
            const res = await axiosInstance.put(`/nuzlocke/runs/${currentRun._id}`, updatedRun);
            setCurrentRun(res.data);
            setNewBoss('');
        } catch (err) {
            console.error('Failed to add boss:', err);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-primary mb-2">Bosses Defeated</h3>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={newBoss}
                    onChange={(e) => setNewBoss(e.target.value)}
                    placeholder="Boss Name"
                    className="input input-bordered input-sm"
                />
                <button onClick={handleAddBoss} className="btn btn-sm btn-accent">Add</button>
            </div>
            <ul className="list-disc list-inside">
                {currentRun.bossesDefeated.map((boss, idx) => (
                    <li key={idx}>{boss}</li>
                ))}
            </ul>
        </div>
    );
};

export default BossForm;