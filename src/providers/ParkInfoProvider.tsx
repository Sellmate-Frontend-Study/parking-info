'use client';

import { getParkInfo } from '@/actions/parkInfo';
import { getParkingInfo } from '@/actions/parkingInfo';
import { createContext, useContext, useEffect, useState } from 'react';

interface ParkInfoContextInterface {
	parkInfos?: any; // TODO : Define parkInfo type
	parkingInfos?: any; // TODO : Define parkingInfo type
}

const parkInfoContext = createContext<ParkInfoContextInterface>({});

export const ParkInfoProvider = ({ children }: { children: React.ReactNode }) => {
	const [parkInfo, setParkInfo] = useState<ParkInfoContextInterface>({
		parkInfos: null,
		parkingInfos: null,
	});

	useEffect(() => {
		Promise.all([getParkInfo(), getParkingInfo()]).then(([parkInfos, parkingInfos]) =>
			setParkInfo({ parkInfos, parkingInfos })
		);
	}, []);

	return <parkInfoContext.Provider value={parkInfo}>{children}</parkInfoContext.Provider>;
};

export const useParkInfo = () => {
	const context = useContext(parkInfoContext);

	return context;
};
