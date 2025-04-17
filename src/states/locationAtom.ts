import { Location } from '@/types/map';
import { atom } from 'jotai';

export const locationAtom = atom<Location>({ latitude: 37.5665, longitude: 126.978 });
