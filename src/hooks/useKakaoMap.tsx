'use client';

import { useState, useEffect } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

interface Coordinates {
	latitude: number; // 위도
	longitude: number; // 경도
}

export function useKakaoMap(
	defaultCoords: Coordinates = { latitude: 37.5665, longitude: 126.978 }
) {
	const [coords, setCoords] = useState<Coordinates>(defaultCoords);
	const [map, setMap] = useState<any>(null);

	useEffect(() => {
		if (!window.kakao || !window.kakao.maps) return;

		const container = document.getElementById('map');
		const options = {
			center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
			level: 3,
		};

		const kakaoMap = new window.kakao.maps.Map(container, options);
		setMap(kakaoMap);

		// 클릭 이벤트 추가 (좌표 업데이트)
		window.kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent: any) => {
			const latLng = mouseEvent.latLng;
			setCoords({ latitude: latLng.getLat(), longitude: latLng.getLng() });
		});
	}, []);

	return { coords, setCoords, map };
}
