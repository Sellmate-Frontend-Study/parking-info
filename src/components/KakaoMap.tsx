'use client';

import useKakaoMap from '@/hooks/useKakaoMap';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';
import { MarkerType } from '@/types/map';
import useParkingInfo from '@/hooks/useParkingInfo';
import { parkInfoDetail } from './ParkingInfoDetail';
import { infoWindowAtom } from '@/states/infoWindowAtom';
import { kakaoMapAtom } from '@/states/kakaoMapAtom';

const getTrafficState = (available: number, total: number): MarkerType => {
	if (total === 1) return MarkerType.Normal;
	const ratio = available / total;
	if (available >= total) return MarkerType.Jammed;
	if (ratio > 0.7) return MarkerType.Congested;
	if (ratio > 0) return MarkerType.Smooth;
	return MarkerType.Normal;
};

const KakaoMap = () => {
	const mapElementRef = useRef<HTMLDivElement>(null);
	const radius = useAtomValue(radiusAtom);
	const location = useAtomValue(locationAtom);
	const { initMap, clearMarkers, setMarker } = useKakaoMap();
	const { getTargetParkingInfos } = useParkingInfo();
	const infoWindow = useAtomValue(infoWindowAtom);
	const kakaoMap = useAtomValue(kakaoMapAtom);
	useEffect(() => {
		clearMarkers();

		const targetParkingInfos = getTargetParkingInfos(location, radius);

		targetParkingInfos.forEach((parkingInfo) => {
			const state: MarkerType = parkingInfo.availableParkingSpots
				? getTrafficState(parkingInfo.availableParkingSpots, parkingInfo.totalParkingCount)
				: MarkerType.Normal;

			setMarker({
				latitude: parkingInfo.latitude,
				longitude: parkingInfo.longitude,
				state: state,
				clickEvent: (marker) => {
					if (kakaoMap && infoWindow) {
						infoWindow?.close();

						const iwContent = parkInfoDetail(parkingInfo);
						infoWindow!.setContent(iwContent);
						infoWindow!.open(kakaoMap, marker);
					}
				},
			});
		});
	}, [location, radius, getTargetParkingInfos]);

	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`}
				onLoad={() => mapElementRef.current && initMap(mapElementRef.current)}
			/>
			<div
				ref={mapElementRef}
				className='h-full w-full'
			></div>
		</>
	);
};

export default KakaoMap;
