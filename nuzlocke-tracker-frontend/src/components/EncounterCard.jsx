// jotai is not required in this file, as this component is fully self-contained
import { useState } from 'react';

const EncounterCard = ({ encounter }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="card bg-base-200 border border-primary p-4 shadow-lg cursor-pointer"
            onClick={() => setExpanded(!expanded)}
        >
            <img
                src={encounter.image}
                alt={encounter.pokemonName}
                className="w-20 h-20 mx-auto"
            />
            <div className="text-center mt-2">
                <p className="font-semibold text-primary">{encounter.nickname || encounter.pokemonName}</p>
                <p className="text-sm">{encounter.pokemonName}</p>
                {expanded && (
                    <div className="text-xs mt-1">
                        <p>Lv. {encounter.level}</p>
                        <p>Nature: {encounter.nature}</p>
                        <p>Status: {encounter.status}</p>
                        <p>Route: {encounter.routeName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EncounterCard;