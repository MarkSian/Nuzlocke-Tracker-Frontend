import { useAtom } from 'jotai';
import { newEncounterAtom } from '../atoms';
import PokemonSelect from './PokemonSelect';

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
        <div className="flex gap-2 flex-wrap mt-2">
            <input
                type="text"
                placeholder="Route Name"
                value={encounter.routeName}
                onChange={(e) => setEncounter({ ...encounter, routeName: e.target.value })}
                className="input input-bordered input-sm w-40"
            />
            <PokemonSelect editing={editingIndex !== null} />
            <input
                type="text"
                placeholder="Nickname (optional)"
                value={encounter.nickname}
                onChange={(e) => setEncounter({ ...encounter, nickname: e.target.value })}
                className="input input-bordered input-sm w-40"
            />
            <input
                type="text"
                placeholder="Nature"
                value={encounter.nature}
                onChange={(e) => setEncounter({ ...encounter, nature: e.target.value })}
                className="input input-bordered input-sm w-32"
            />
            <input
                type="number"
                placeholder="Level"
                value={encounter.level || ''}
                onChange={(e) => setEncounter({ ...encounter, level: e.target.value })}
                className="input input-bordered input-sm w-24"
            />
            <select
                className="select select-sm select-bordered"
                value={encounter.status || 'Captured'}
                onChange={(e) => setEncounter({ ...encounter, status: e.target.value })}
            >
                <option value="Captured">Captured</option>
                <option value="Fainted">Fainted</option>
                <option value="Skipped">Skipped</option>
            </select>
            {editingIndex !== null ? (
                <button onClick={handleEditEncounter} className="btn btn-sm btn-warning">
                    Update
                </button>
            ) : (
                <button onClick={handleAddEncounter} className="btn btn-sm btn-success">
                    Add
                </button>
            )}
        </div>
    );
};

export default EncounterForm;