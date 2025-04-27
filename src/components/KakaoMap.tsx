'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { MarkerType } from '@/types/marker';
import { calculateHaversineDistance } from '@/utils/calculateHaversinceDistance';
import { useAtom } from 'jotai';
import { parkInfoAtom, parkingInfoAtom } from '@/stores/parkInfoAtom';
import { locationAtom } from '@/stores/locationAtom';
import { radiusAtom } from '@/stores/radiusAtom';

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

	const [parkInfos] = useAtom(parkInfoAtom);
	const [parkingInfos] = useAtom(parkingInfoAtom);
	const [location] = useAtom(locationAtom);
	const [radius] = useAtom(radiusAtom);

	const { initMap, map, setMarkersFromData, setCirclePosition, setMapPosition } = useKakaoMap();

	useEffect(() => {
		if (!parkInfos || !map) return;

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

		setMarkersFromData(markerData);
	}, [map, location, parkInfos, parkingInfos, radius]);

	useEffect(() => {
		setMapPosition();
	}, [location]);

	useEffect(() => {
		if (!map) return;
		setCirclePosition();
	}, [map, radius, location]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer,services`}
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
