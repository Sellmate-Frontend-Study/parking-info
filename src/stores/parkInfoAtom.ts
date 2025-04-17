import { atom } from 'jotai';
// import { getParkInfo } from '@/actions/parkInfo';
import type { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';
// import { getParkInfo } from '@/actions/parkInfo';
// import { getParkingInfo } from '@/actions/parkingInfo';

export const parkInfoAtom = atom<ParkInfo[]>([]);
export const parkingInfoAtom = atom<ParkingInfo[]>([]);

// export const parkInfoAtom = atom<Promise<ParkInfo[]>>(async () => {
// 	const data = await getParkInfo();
// 	return data;
// });

// export const parkingInfoAtom = atom<Promise<ParkingInfo[]>>(async () => {
// 	const data = await getParkingInfo();
// 	return data;
// });
