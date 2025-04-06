'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { MarkerType } from '@/types/marker';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const getTrafficState = (available: number, total: number): MarkerType => {
	if (total === 1) return 'normal';
	const ratio = available / total;
	if (available >= total) return 'jammed';
	if (ratio > 0.7) return 'congested';
	if (ratio > 0) return 'smooth';
	return 'normal';
};

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { radius, centerLocation, initMap, setMarkersFromData } = useKakaoMap();
	const { parkInfos, parkingInfos } = useParkInfo();

	useEffect(() => {
		if (!parkInfos) return;

		const targetParkInfos = parkInfos.filter((parkInfo) => {
			const distance = calculateHaversineDistance({
				lat1: centerLocation.lat,
				lng1: centerLocation.lng,
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

			return { lat: parkInfo.LAT, lng: parkInfo.LOT, state };
		});

		setMarkersFromData(markerData);
	}, [centerLocation, parkInfos, parkingInfos]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`}
				onLoad={() => mapRef.current && initMap(mapRef.current)}
			/>
			<div
				ref={mapRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
