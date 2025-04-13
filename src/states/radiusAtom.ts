import { Radius } from '@/types/radius';
import { atom } from 'jotai';

export const radiusAtom = atom<Radius>(Radius.R200);
