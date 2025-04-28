import { atom } from 'jotai';
import type { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';

export const parkInfoAtom = atom<ParkInfo[]>([]);
export const parkingInfoAtom = atom<ParkingInfo[]>([]);
