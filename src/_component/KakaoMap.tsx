'use client';

import { useDataContext } from '@/context/dataContext';
import useModal from '@/hooks/custom/useModal';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

declare global {
	interface Window {
		// eslint-disable-next-line
		kakao: any;
	}
}

export default function KakaoMap() {
	const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
	const [map, setMap] = useState<any>(null);
	const [markers, setMarkers] = useState<any>([]);
	const { dataState } = useDataContext();
	const { modalNode, openModal } = useModal();

	const initMap = () => {
		if (window.kakao && window.kakao.maps) {
			const container = document.getElementById('map');
			const options = {
				center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
				level: 3,
			};
			const mapInstance = new window.kakao.maps.Map(container, options);

			var zoomControl = new window.kakao.maps.ZoomControl();
			// 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
			mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

			const circle = new window.kakao.maps.Circle({
				// map: mapInstance,
				center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
				radius: 500,
				strokeWeight: 2,
				strokeColor: '#FF00FF',
				strokeOpacity: 0.8,
				strokeStyle: 'dashed',
				fillColor: '#00EEEE',
				fillOpacity: 0.5,
			});
			circle.setMap(mapInstance);

			setMap(mapInstance);
		}
	};

	const markerEventListner = (targetMarker: any) => {
		window.kakao.maps.event.addListener(targetMarker, 'click', function () {
			openModal();
		});
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCurrentPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);

	useEffect(() => {
		if (map && currentPosition.lat !== 0 && currentPosition.lng !== 0) {
			const moveLatLon = new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);
			const circle = new window.kakao.maps.Circle({
				// map: mapInstance,
				center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
				radius: 500,
				strokeWeight: 2,
				strokeColor: '#FF00FF',
				strokeOpacity: 0.8,
				strokeStyle: 'dashed',
				fillColor: 'none',
				fillOpacity: 0.5,
			});
			circle.setMap(map);
			map.setCenter(moveLatLon);
		}
	}, [map, currentPosition]);

	useEffect(() => {
		if (dataState && window.kakao && window.kakao.maps) {
			markers.forEach((marker: any) => marker.setMap(null));

			const newMarkers = dataState.row?.reduce<any[]>((acc, item) => {
				const { LAT, LOT, PKLT_NM } = item;
				const lat = LAT['#text'];
				const lng = LOT['#text'];
				const name = PKLT_NM['#text'];

				if (lat && lng) {
					const markerPosition = new window.kakao.maps.LatLng(lat, lng);
					const marker = new window.kakao.maps.Marker({
						position: markerPosition,
						title: name,
						clickable: true,
						map,
					});
					markerEventListner(marker);
					// marker.setTitle(name);
					return [...acc, marker];
				}
				return acc;
			}, []);

			const firstMarkerPosition = newMarkers[0].getPosition();
			setCurrentPosition({ lat: firstMarkerPosition.getLat(), lng: firstMarkerPosition.getLng() });
			setMarkers(newMarkers || []);
		}
	}, [map, dataState]);

	return (
		<>
			<div className='map-container w-screen h-screen overflow-hidden'>
				<div
					id='map'
					className='min-w-screen min-h-screen'
				/>
			</div>
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=e904c4222be891bf9a59a7d1b1bb9e68&autoload=false`}
				strategy='afterInteractive'
				onLoad={() => {
					console.log('Kakao Map Loaded');
					window.kakao.maps.load(() => {
						initMap();
					});
				}}
			/>
			<>{modalNode}</>
		</>
	);
}
