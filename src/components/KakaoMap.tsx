'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import { useParkInfo } from '@/providers/ParkInfoProvider';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import { getCurrentLocation } from '@/utils/geoLocation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

const KakaoMap = () => {
	const RADIUS = 250;
	const mapRef = useRef<HTMLDivElement>(null);
	const { map, centerLocation, initMap, setCenter } = useKakaoMap();
	const { parkInfos } = useParkInfo();

	useEffect(() => {
		getCurrentLocation().then((position) => {
			setCenter(position.coords.latitude, position.coords.longitude);
		});
	}, [map]);

	useEffect(() => {
		// TODO : 최초 페이지 진입 시 주차장 정보 조회에 완료가 안된 상태일 때 처리 필요
		if (parkInfos) {
			const targetParkInfos = parkInfos.filter((parkInfo: any) => {
				const distance = calculateHaversineDistance({
					lat1: centerLocation.lat,
					lng1: centerLocation.lng,
					lat2: parseFloat(parkInfo.LAT),
					lng2: parseFloat(parkInfo.LOT),
				});
				return distance <= RADIUS;
			});

			console.log(targetParkInfos);
		}
	}, [centerLocation]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				onLoad={() => mapRef.current && initMap(mapRef.current, RADIUS)}
			/>
			<div
				ref={mapRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
