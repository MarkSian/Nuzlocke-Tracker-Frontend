import { atom } from 'jotai';

// export const authTokenAtom = atom(localStorage.getItem('token') || '');
export const userAtom = atom(null);
export const currentRunAtom = atom(null);
export const loadingAtom = atom(false);
export const errorAtom = atom('');
export const pokemonStatsAtom = atom({});

// Additional state for encounter modifications and inputs
export const modifiedEncountersAtom = atom([]);
export const newEncounterAtom = atom({ routeName: '', pokemonName: '', nickname: '', nature: '', level: '' });
export const newBossAtom = atom('');
export const newRivalAtom = atom('');
export const newRunGameAtom = atom('');
export const newRunStarterAtom = atom('');
export const newBadgeAtom = atom('');