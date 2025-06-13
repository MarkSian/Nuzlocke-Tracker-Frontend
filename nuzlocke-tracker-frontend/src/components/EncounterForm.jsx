import { useAtom } from 'jotai';
import PokemonSelect from './PokemonSelect';
import { newEncounterAtom } from '../atoms';

const EncounterForm = ({
    editingIndex,
    editingEncounter,
    setEditingEncounter,
    setNewEncounter,
    handleAddEncounter,
    handleEditEncounter,
}) => {
    const [newEncounter] = useAtom(newEncounterAtom);

    const encounter = editingIndex !== null ? editingEncounter : newEncounter;
    const setEncounter = editingIndex !== null ? setEditingEncounter : setNewEncounter;

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-wrap gap-4 mt-4 items-center justify-center bg-base-100 p-6 rounded-box border-2 border-primary shadow-xl max-w-4xl">
                <input
                    type="text"
                    placeholder="Route Name"
                    value={encounter.routeName}
                    onChange={(e) => setEncounter({ ...encounter, routeName: e.target.value })}
                    className="input input-bordered input-primary border-2 border-primary w-48 bg-base-100 text-base-content"
                />
                <PokemonSelect editing={editingIndex !== null} />
                <input
                    type="text"
                    placeholder="Nickname (optional)"
                    value={encounter.nickname}
                    onChange={(e) => setEncounter({ ...encounter, nickname: e.target.value })}
                    className="input input-bordered input-primary border-2 border-primary w-40 bg-base-100 text-base-content"
                />
                <input
                    type="text"
                    placeholder="Nature"
                    value={encounter.nature}
                    onChange={(e) => setEncounter({ ...encounter, nature: e.target.value })}
                    className="input input-bordered input-primary border-2 border-primary w-32 bg-base-100 text-base-content"
                />
                <input
                    type="number"
                    placeholder="Level"
                    value={encounter.level || ''}
                    onChange={(e) => setEncounter({ ...encounter, level: e.target.value })}
                    className="input input-bordered input-primary border-2 border-primary w-24 bg-base-100 text-base-content"
                />
                <select
                    className="select select-primary border-2 border-primary w-32 bg-base-100 text-base-content"
                    value={encounter.status || 'Captured'}
                    onChange={(e) => setEncounter({ ...encounter, status: e.target.value })}
                >
                    <option value="Captured">Captured</option>
                    <option value="Fainted">Fainted</option>
                    <option value="Skipped">Skipped</option>
                </select>
                {editingIndex !== null ? (
                    <button onClick={handleEditEncounter} className="btn btn-warning w-32">
                        Update
                    </button>
                ) : (
                    <button onClick={handleAddEncounter} className="btn btn-success w-32">
                        Add
                    </button>
                )}
            </div>
        </div>
    );
};

export default EncounterForm;