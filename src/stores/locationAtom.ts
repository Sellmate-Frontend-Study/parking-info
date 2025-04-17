import { atom } from 'jotai';
import { type Location } from '@/types/location';

export const locationAtom = atom<Location>({
	latitude: 37.5665,
	longitude: 126.978,
});
