'use client';

import { getParkInfo } from '@/actions/parkInfo';
import { getParkingInfo } from '@/actions/parkingInfo';
import { getPrivateParkInfos } from '@/actions/privateParkInfo';
import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';
import { PrivateParkInfo } from '@/types/privateParkInfo';
import { createContext, useContext, useEffect, useState } from 'react';

interface ParkInfoContextInterface {
	parkInfos?: ParkInfo[];
	parkingInfos?: ParkingInfo[];
	privateParkInfos?: PrivateParkInfo[];
}

const parkInfoContext = createContext<ParkInfoContextInterface>({});

export const ParkInfoProvider = ({ children }: { children: React.ReactNode }) => {
	const [parkInfo, setParkInfo] = useState<ParkInfoContextInterface>({});

	useEffect(() => {
		Promise.all([getParkInfo(), getParkingInfo(), getPrivateParkInfos()]).then(
			([parkInfos, parkingInfos, privateParkInfos]) => {
				setParkInfo({ parkInfos, parkingInfos, privateParkInfos });
				console.log(privateParkInfos);
			}
		);
	}, []);

	return <parkInfoContext.Provider value={parkInfo}>{children}</parkInfoContext.Provider>;
};

export const useParkInfo = () => {
	const context = useContext(parkInfoContext);

	return context;
};
