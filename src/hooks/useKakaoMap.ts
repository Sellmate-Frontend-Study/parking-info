import { useEffect, useState } from 'react';

const useKakaoMap = () => {
	const RADIUS = 250;
	const [centerLocation, setCenterLocation] = useState({ lat: 37.5665, lng: 126.978 });
	const [map, setMap] = useState<any>(null);
	const [circle, setCircle] = useState<any>(null);

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			const options = {
				center: center,
				level: 3,
			};

			const map = new kakao.maps.Map(mapElement, options);
			setMap(map);

			const circle = new kakao.maps.Circle({
				center: center,
				radius: RADIUS,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			circle.setMap(map);
			setCircle(circle);

			kakao.maps.event.addListener(map, 'dragend', () => {
				const position = map.getCenter();
				setCenterLocation({ lat: position.getLat(), lng: position.getLng() });
			});
		});
	};

	const setCenter = (lat: number, lng: number) => {
		if (map) {
			const moveLocation = new kakao.maps.LatLng(lat, lng);
			map.setCenter(moveLocation);

			setCenterLocation({ lat, lng });
		}
	};

	const setCirclePosition = () => {
		if (circle) {
			const moveLocation = new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			circle.setPosition(moveLocation);
		}
	};

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation]);

	return { map, RADIUS, centerLocation, initMap, setCenter };
};

export default useKakaoMap;
