import { MarkerData } from '@/types/marker';
import { atom } from 'jotai';

export const markerInfoAtom = atom<MarkerData>({} as MarkerData);
