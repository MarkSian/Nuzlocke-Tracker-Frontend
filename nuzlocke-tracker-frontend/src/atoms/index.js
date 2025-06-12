import { atom } from 'jotai';


export const userAtom = atom(null);
export const currentRunAtom = atom(null);
export const loadingAtom = atom(false);
export const errorAtom = atom('');
export const pokemonStatsAtom = atom({}); // For storing Pokémon stats fetched from the API

// Additional state for encounter modifications and inputs
export const modifiedEncountersAtom = atom([]); // For storing modified encounters
export const newEncounterAtom = atom({ routeName: '', pokemonName: '', nickname: '', nature: '', level: '' });
export const newBossAtom = atom(''); // For adding new boss encounters or gym leaders
export const newRivalAtom = atom(''); // For adding new rival encounters
export const newRunGameAtom = atom(''); // For adding new game versions
export const newRunStarterAtom = atom(''); // For adding new starter Pokémon
export const newBadgeAtom = atom(''); // For adding new badges