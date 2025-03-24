import { useEffect, useState } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

const useKakaoMap = () => {
	const [centerLocation, setCenterLocation] = useState({ lat: 33.450701, lng: 126.570667 });
	const [map, setMap] = useState<any>(null);
	const [circle, setCircle] = useState<any>(null);

	const initMap = (mapElement: HTMLElement, radius: number) => {
		window.kakao.maps.load(() => {
			const center = new window.kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			const options = {
				center: center,
				level: 3,
			};

			const map = new window.kakao.maps.Map(mapElement, options);
			setMap(map);

			const circle = new window.kakao.maps.Circle({
				center: center,
				radius: radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			circle.setMap(map);
			setCircle(circle);

			window.kakao.maps.event.addListener(map, 'dragend', () => {
				const position = map.getCenter();
				setCenterLocation({ lat: position.getLat(), lng: position.getLng() });
			});
		});
	};

	const setCenter = (lat: number, lng: number) => {
		if (map) {
			const moveLocation = new window.kakao.maps.LatLng(lat, lng);
			map.setCenter(moveLocation);

			setCenterLocation({ lat, lng });
		}
	};

	const setCirclePosition = () => {
		if (circle) {
			const moveLocation = new window.kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			circle.setPosition(moveLocation);
		}
	};

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation]);

	return { map, centerLocation, initMap, setCenter };
};

export default useKakaoMap;
