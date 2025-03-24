'use client';

import { useDataContext } from '@/context/dataContext';
import useMapData from '@/hooks/api/useMap';
import { useInitMap } from '@/hooks/custom/useInitMap';
import { useMapMarkers } from '@/hooks/custom/useMapMarkers';
import useModal from '@/hooks/custom/useModal';
import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
	interface Window {
		// eslint-disable-next-line
		kakao: any;
	}
}

export default function KakaoMap() {
	const { dataState, setDataState, currentPosition, setCurrentPosition } = useDataContext();
	const { modalNode, openModal } = useModal();
	const { map, initMap } = useInitMap(currentPosition);
	const { markers } = useMapMarkers(map, openModal);
	const [circle, setCircle] = useState<any>(null);
	const { mapData } = useMapData();

	useEffect(() => {
		if (!navigator.geolocation) return;

		navigator.geolocation.getCurrentPosition((position) => {
			setCurrentPosition({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	useEffect(() => {
		if (!map || currentPosition.lat === 0 || currentPosition.lng === 0) return;

		if (circle) {
			circle.setMap(null);
		}

		const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
		map.setCenter(moveLatLon);

		const circleInstance = new window.kakao.maps.Circle({
			center: moveLatLon,
			radius: 500,
			strokeWeight: 2,
			strokeColor: '#FF00FF',
			strokeOpacity: 0.8,
			strokeStyle: 'dashed',
			fillColor: 'none',
			fillOpacity: 0.5,
		});
		circleInstance.setMap(map);
		setCircle(circleInstance);
	}, [map, currentPosition]);

	useEffect(() => {
		setDataState(mapData);
	}, [mapData, setDataState]);

	return (
		<>
			<div className='map-container h-screen w-screen overflow-hidden'>
				<div
					id='map'
					className='min-h-screen min-w-screen'
				/>
			</div>
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`}
				strategy='afterInteractive'
				onLoad={() => {
					window.kakao.maps.load(() => {
						initMap();
					});
				}}
			/>
			<>{modalNode}</>
		</>
	);
}
