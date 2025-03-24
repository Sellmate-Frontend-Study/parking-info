import { useDataContext } from '@/context/dataContext';
import { useState, useEffect } from 'react';

export const useMapMarkers = (map: any, openModal: () => void) => {
	const [markers, setMarkers] = useState<any>([]);
	const { dataState, currentPosition } = useDataContext();

	const markerEventListener = (targetMarker: any) => {
		window.kakao.maps.event.addListener(targetMarker, 'click', function () {
			openModal();
		});
	};

	// Haversine 공식 적용
	function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
		function toRad(value: number) {
			return (value * Math.PI) / 180;
		}

		const R = 6371000; // 지구 반지름 (미터 단위)
		const dLat = toRad(lat2 - lat1);
		const dLng = toRad(lng2 - lng1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // 거리 (미터)
	}

	// 원 안에 포함되는지 확인
	function isInsideCircle(markerPosition: { lat: number; lng: number }, radius: number) {
		const distance = getDistance(
			markerPosition.lat,
			markerPosition.lng,
			currentPosition.lat,
			currentPosition.lng
		);

		return distance <= radius;
	}

	useEffect(() => {
		if (!dataState?.length || !map) return;

		if (markers.length) {
			markers.forEach((marker: any) => marker.setMap(null));
		}

		const newMarkers = (dataState as any[]).reduce<any[]>((acc, item) => {
			const { LAT, LOT, PKLT_NM } = item;

			if (LAT && LOT) {
				const markerPosition = new window.kakao.maps.LatLng(LAT, LOT);
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
					title: PKLT_NM,
					clickable: true,
				});

				if (isInsideCircle({ lat: LAT, lng: LOT }, 500)) {
					marker.setMap(map); // 원 안에 있는 경우 지도에 추가
					markerEventListener(marker);
					return [...acc, marker];
				}
				return acc;
			}
			return acc;
		}, []);

		setMarkers(newMarkers || []);
	}, [map, currentPosition, dataState]);

	return { markers };
};
