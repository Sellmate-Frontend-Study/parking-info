'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { map, RADIUS, centerLocation, initMap } = useKakaoMap();
	const { parkInfos } = useParkInfo();
	const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

	useEffect(() => {
		if (parkInfos && map) {
			const targetParkInfos = parkInfos.filter((parkInfo) => {
				const distance = calculateHaversineDistance({
					lat1: centerLocation.lat,
					lng1: centerLocation.lng,
					lat2: parkInfo.LAT,
					lng2: parkInfo.LOT,
				});
				return distance <= RADIUS;
			});

			markers.forEach((marker) => marker.setMap(null));
			const newMarkers = targetParkInfos.map((parkInfo) => {
				const markerPosition = new kakao.maps.LatLng(parkInfo.LAT, parkInfo.LOT);
				const marker = new kakao.maps.Marker({ position: markerPosition });
				marker.setMap(map);
				return marker;
			});

			setMarkers(newMarkers);

			console.log(targetParkInfos);
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
