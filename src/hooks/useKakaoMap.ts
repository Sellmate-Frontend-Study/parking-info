import { getCurrentLocation } from '@/utils/geoLocation';
import { useEffect, useState } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

const useKakaoMap = () => {
	const [centerLocation, setCenterLocation] = useState({ lat: 33.450701, lng: 126.570667 });
	const [map, setMap] = useState<any>(null);

	const initMap = (mapElement: HTMLElement) => {
		window.kakao.maps.load(() => {
			getCurrentLocation().then((position) => {
				setCenterLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
			});

			const options = {
				center: new window.kakao.maps.LatLng(centerLocation.lat, centerLocation.lng),
				level: 3,
			};

			setMap(new window.kakao.maps.Map(mapElement, options));
		});
	};

	const setCenter = () => {
		if (map) {
			const moveLocation = new window.kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			map.setCenter(moveLocation);
		}
	};

	useEffect(() => {
		setCenter();
	}, [centerLocation]);

	return { initMap };
};

export default useKakaoMap;
