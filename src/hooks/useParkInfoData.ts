'use client';

import { useAtom } from 'jotai';
import { parkInfoAtom, parkingInfoAtom } from '@/stores/parkInfoAtom';
import { radiusAtom } from '@/stores/radiusAtom';
import { locationAtom } from '@/stores/locationAtom';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import { MarkerType } from '@/types/marker';
import { useCallback } from 'react';

export const useParkInfoData = () => {
	const [parkInfos] = useAtom(parkInfoAtom);
	const [parkingInfos] = useAtom(parkingInfoAtom);
	const [radius] = useAtom(radiusAtom);
	const [location] = useAtom(locationAtom);

	const getTrafficState = (available: number, total: number): MarkerType => {
		if (total === 1) return 'normal';
		const ratio = available / total;
		if (available >= total) return 'jammed';
		if (ratio > 0.7) return 'congested';
		if (ratio > 0) return 'smooth';
		return 'normal';
	};

	const getParkInfoData = useCallback(() => {
		const targetParkInfos = !radius
			? parkInfos
			: parkInfos.filter((parkInfo) => {
					const distance = calculateHaversineDistance({
						lat1: location.latitude,
						lng1: location.longitude,
						lat2: parkInfo.LAT,
						lng2: parkInfo.LOT,
					});
					return distance <= radius;
				});

		const markerData = targetParkInfos.map((parkInfo) => {
			const realTimeInfo = parkingInfos?.find(
				(info) => info.PKLT_NM === parkInfo.PKLT_NM && info.ADDR === parkInfo.ADDR
			);

			const state: MarkerType = realTimeInfo
				? getTrafficState(realTimeInfo.NOW_PRK_VHCL_CNT, realTimeInfo.TPKCT)
				: 'normal';

			const markerInfo = {
				latitude: parkInfo.LAT,
				longitude: parkInfo.LOT,
				state,
				parkInfo,
				realTimeInfo,
			};

			return markerInfo;
		});

		return markerData;
	}, [parkInfos, parkingInfos, radius, location]);

	return {
		getParkInfoData,
	};
};
