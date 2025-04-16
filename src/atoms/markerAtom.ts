import { MarkerDetail } from '@/types/marker';
import { atom } from 'jotai';

export const MarkerDetailAtom = atom<MarkerDetail | null>(null);

export const MarkerDrawerAtom = atom<boolean>(false);
