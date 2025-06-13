import AsyncSelect from 'react-select/async'; // AsyncSelect allows for loading options asynchronously while searching
import axios from 'axios';
import { useAtom } from 'jotai';
import { newEncounterAtom } from '../atoms';
import { useCallback } from 'react';

const PokemonSelect = () => {
    const [newEncounter, setNewEncounter] = useAtom(newEncounterAtom);

    // loadOptions is an async function that takes the user’s search input and returns a Promise that resolves to an array of options for the dropdown
    // It’s called by AsyncSelect every time the user types in the search bar.
    const loadOptions = useCallback(async (inputValue) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const filtered = res.data.results.filter(p =>
                p.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            // Promise.all is used to fetch details for multiple Pokémon in parallel, making the dropdown fast and responsive.
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
        // AsyncSelect calls loadOptions as you type.
        // loadOptions fetches and returns options, using Promise.all for parallel requests.
        // When you pick an option, handleChange updates your state.
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