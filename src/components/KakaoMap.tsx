'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { setMarkers } from '@/hooks/useKakaoMarker';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { RADIUS, map, centerLocation, initMap } = useKakaoMap();
	const { parkInfos } = useParkInfo();

	useEffect(() => {
		if (parkInfos) {
			const targetParkInfos = parkInfos.filter((parkInfo) => {
				const distance = calculateHaversineDistance({
					lat1: centerLocation.lat,
					lng1: centerLocation.lng,
					lat2: parkInfo.LAT,
					lng2: parkInfo.LOT,
				});
				return distance <= RADIUS;
			});

			setMarkers(map, targetParkInfos);
		}
	}, [centerLocation, parkInfos]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
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
