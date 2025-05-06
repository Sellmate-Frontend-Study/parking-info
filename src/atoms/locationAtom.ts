import { atom } from 'jotai';

interface Position {
	lat: number;
	lng: number;
}

export const locationAtom = atom<Position>({ lat: 37.5665, lng: 126.978 });
export const viewLocationAtom = atom<Position>({ lat: 37.5665, lng: 126.978 });

export const updateLocationWithView = atom(null, (get, set) => {
	console.log(1);

	const viewLocation = get(viewLocationAtom);
	set(locationAtom, viewLocation);
});
