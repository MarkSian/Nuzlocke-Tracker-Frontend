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
        <div className="mt-7">
            <h3 className="text-lg font-semibold text-primary mb-2">Bosses Defeated</h3>
            <div className="mt-7 w-full flex justify-center my-4">
                <div className="flex flex-row gap-4 items-center">
                    <input
                        type="text"
                        value={newBoss}
                        onChange={(e) => setNewBoss(e.target.value)}
                        placeholder="Boss Name"
                        className="input input-bordered input-primary border-2 border-primary w-48 bg-base-100 text-base-content"
                    />
                    <button onClick={handleAddBoss} className="btn btn-accent w-32">
                        Add
                    </button>
                </div>
            </div>
            <ul className="mt-7 list-disc list-inside">
                {currentRun.bossesDefeated.map((boss, id) => (
                    <li key={id}>{boss}</li>
                ))}
            </ul>
        </div>
    );
};

export default BossForm;