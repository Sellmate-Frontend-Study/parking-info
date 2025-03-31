import { Location } from '@/types/location';
import { useEffect, useState } from 'react';

const useKakaoMap = () => {
	const RADIUS = 250;
	const [centerLocation, setCenterLocation] = useState({ lat: 37.5665, lng: 126.978 });
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const [markerCluster, setMarkerCluster] = useState<kakao.maps.MarkerClusterer | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			const options = {
				center: center,
				level: 3,
			};

			const map = new kakao.maps.Map(mapElement, options);
			setMap(map);

			const markerCluster = new kakao.maps.MarkerClusterer({
				map: map!,
				averageCenter: true,
				minLevel: 10,
			});
			setMarkerCluster(markerCluster);

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

	const setCirclePosition = () => {
		if (circle) {
			const moveLocation = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			circle.setPosition(moveLocation);
		}
	};

	const setMarkers = (locations: Location[]) => {
		markerCluster?.clear();

		const markers = locations.map((location) => {
			return new kakao.maps.Marker({
				map: map!,
				position: newLatLng(location),
			});
		});

		markerCluster?.addMarkers(markers);
	};

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation]);

	return { map, RADIUS, centerLocation, initMap, setMarkers };
};

export default useKakaoMap;
