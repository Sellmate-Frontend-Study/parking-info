import { atom } from 'jotai';

interface Position {
	lat: number;
	lng: number;
}

export const locationAtom = atom<Position>({ lat: 37.5665, lng: 126.978 });
