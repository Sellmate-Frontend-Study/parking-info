'use client';

import { getParkInfo } from '@/actions/parkInfo';
import { getParkingInfo } from '@/actions/parkingInfo';
import { getPrivateParkInfo } from '@/actions/privateParkInfo';
import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';
import { createContext, useContext, useEffect, useState } from 'react';

interface ParkInfoContextInterface {
	parkInfos?: ParkInfo[];
	parkingInfos?: ParkingInfo[];
}

const parkInfoContext = createContext<ParkInfoContextInterface>({});

export const ParkInfoProvider = ({ children }: { children: React.ReactNode }) => {
	const [parkInfo, setParkInfo] = useState<ParkInfoContextInterface>({});

	useEffect(() => {
		Promise.all([getParkInfo(), getParkingInfo(), getPrivateParkInfo()]).then(
			([publicParkInfos, parkingInfos, privateParkInfos]) => {
				const combined = [...publicParkInfos, ...privateParkInfos];
				setParkInfo({ parkInfos: combined, parkingInfos });
			}
		);
	}, []);

	return <parkInfoContext.Provider value={parkInfo}>{children}</parkInfoContext.Provider>;
};

export const useParkInfo = () => {
	return useContext(parkInfoContext);
};
