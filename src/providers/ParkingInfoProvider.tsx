'use client';

import { getPrivateParkingInfo } from '@/actions/privateParkingInfo';
import { getPublicParkingInfo } from '@/actions/publicParkingInfo';
import { parkingInfoAtom } from '@/states/parkingInfoAtom';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const ParkingInfoProvider = ({ children }: { children: React.ReactNode }) => {
	const setParkingInfo = useSetAtom(parkingInfoAtom);

	useEffect(() => {
		Promise.all([getPublicParkingInfo(), getPrivateParkingInfo()]).then(
			([publicParkingInfo, privateParkingInfo]) =>
				setParkingInfo([...publicParkingInfo, ...privateParkingInfo])
		);
	}, []);

	return <>{children}</>;
};
