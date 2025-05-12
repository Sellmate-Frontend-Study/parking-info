import { ParkingInfo } from '@/types/parkingInfo';
import { atom } from 'jotai';

export const parkingInfoAtom = atom<ParkingInfo[]>([]);
