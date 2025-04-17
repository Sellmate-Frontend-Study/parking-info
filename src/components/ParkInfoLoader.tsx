'use client';
import { getParkInfo } from '@/actions/parkInfo';
import { getParkingInfo } from '@/actions/parkingInfo';
import { parkInfoAtom, parkingInfoAtom } from '@/stores/parkInfoAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const ParkInfoLoader = () => {
	const [, setParkInfos] = useAtom(parkInfoAtom);
	const [, setParkingInfos] = useAtom(parkingInfoAtom);

	useEffect(() => {
		Promise.all([getParkInfo(), getParkingInfo()]).then(([parkInfos, parkingInfos]) => {
			setParkInfos(parkInfos);
			setParkingInfos(parkingInfos);
		});
	}, []);

	return null;
};

export default ParkInfoLoader;
