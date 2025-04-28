import { RADIUS_OPTIONS } from '@/components/SelectRadius';
import { atom } from 'jotai';

export const radiusAtom = atom<number | null>(RADIUS_OPTIONS[4].value as number);
