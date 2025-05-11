'use client';

import { getParkInfo } from '@/actions/parkInfo';
import { getParkingInfo } from '@/actions/parkingInfo';
import { ParkInfo } from '@/types/parkInfo';
import { ParkingInfo } from '@/types/parkingInfo';
import { createContext, useEffect, useState } from 'react';

interface ParkInfoContextInterface {
	parkInfos?: ParkInfo[];
	parkingInfos?: ParkingInfo[];
}

export const parkInfoContext = createContext<ParkInfoContextInterface>({});

export const ParkInfoProvider = ({ children }: { children: React.ReactNode }) => {
	const [parkInfo, setParkInfo] = useState<ParkInfoContextInterface>({});

	useEffect(() => {
		Promise.all([getParkInfo(), getParkingInfo()]).then(([parkInfos, parkingInfos]) =>
			setParkInfo({ parkInfos, parkingInfos })
		);
	}, []);

	return <parkInfoContext.Provider value={parkInfo}>{children}</parkInfoContext.Provider>;
};
