import { parkingInfoAtom } from '@/states/parkingInfoAtom';
import { Location } from '@/types/map';
import { Radius } from '@/types/radius';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

const useParkingInfo = () => {
	const parkingInfo = useAtomValue(parkingInfoAtom);

	const getTargetParkingInfos = useCallback(
		(location: Location, radius: Radius) =>
			parkingInfo.filter((v) => {
				const distance = calculateHaversineDistance({
					lat1: location.latitude,
					lng1: location.longitude,
					lat2: v.latitude,
					lng2: v.longitude,
				});
				return distance <= radius;
			}) ?? [],
		[parkingInfo]
	);

	return {
		parkingInfo,
		getTargetParkingInfos,
	};
};

export default useParkingInfo;
