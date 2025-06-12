import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { useAtom } from 'jotai';
import { newEncounterAtom } from '../atoms';
import { useCallback } from 'react';

const PokemonSelect = () => {
    const [newEncounter, setNewEncounter] = useAtom(newEncounterAtom);

    const loadOptions = useCallback(async (inputValue) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const filtered = res.data.results.filter(p =>
                p.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            const detailed = await Promise.all(
                filtered.slice(0, 10).map(async (pokemon) => {
                    const detailsRes = await axios.get(pokemon.url);
                    const { name, id, sprites } = detailsRes.data;
                    return {
                        label: name,
                        value: name,
                        image: sprites.front_default,
                        id
                    };
                })
            );

            return detailed.map(p => ({
                label: (
                    <div className="flex items-center gap-2">
                        <img src={p.image} alt={p.label} className="w-6 h-6" />
                        <span className="capitalize">{p.label}</span>
                    </div>
                ),
                value: p.value,
                data: { id: p.id, name: p.label, image: p.image }
            }));
        } catch (err) {
            console.error('Error loading Pokémon:', err);
            return [];
        }
    }, []);

    const handleChange = (selectedOption) => {
        if (!selectedOption) return;
        const { name, id, image } = selectedOption.data;
        setNewEncounter({ ...newEncounter, pokemonName: name, pokemonId: id, image });
    };

    return (
        <div className="w-64">
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                onChange={handleChange}
                placeholder="Search Pokémon"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default PokemonSelect;