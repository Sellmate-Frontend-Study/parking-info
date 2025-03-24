import { useState } from 'react';

interface Position {
	lat: number;
	lng: number;
}

export const useInitMap = (currentPosition: Position) => {
	const [map, setMap] = useState<any>(null);

	const initMap = () => {
		if (window.kakao && window.kakao.maps) {
			const container = document.getElementById('map');
			const options = {
				center: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
				level: 3,
			};
			const mapInstance = new window.kakao.maps.Map(container, options);

			var zoomControl = new window.kakao.maps.ZoomControl();
			mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.BOTTOMRIGHT);

			const circle = new window.kakao.maps.Circle({
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

	return { map, initMap };
};
