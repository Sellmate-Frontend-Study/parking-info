'use	client';

import { RADIUS_OPTIONS } from '@/constants/radiusOptions';
import { MarkerType } from '@/types/marker';
import { useCallback, useEffect, useState } from 'react';

const useKakaoMap = () => {
	const [radius, setRadius] = useState<number>(RADIUS_OPTIONS[0].value / 2);
	const [centerLocation, setCenterLocation] = useState({ lat: 37.5665, lng: 126.978 });
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			const options = {
				center: center,
				level: 3,
			};

			const kakaoMap = new kakao.maps.Map(mapElement, options);
			setMap(kakaoMap);

			const kakaoCircle = new kakao.maps.Circle({
				center,
				radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			kakaoCircle.setMap(kakaoMap);
			setCircle(kakaoCircle);

			kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
				const newCenter = kakaoMap.getCenter();
				setCenterLocation({ lat: newCenter.getLat(), lng: newCenter.getLng() });
			});
		});
	};

	const setCirclePosition = useCallback(() => {
		if (circle) {
			const newCenter = new kakao.maps.LatLng(centerLocation.lat, centerLocation.lng);
			circle.setPosition(newCenter);
		}
	}, [circle, centerLocation]);

	const clearMarkers = () => {
		markers.forEach((marker) => marker.setMap(null));
		setMarkers([]);
	};

	const setMarkersFromData = useCallback(
		(data: { lat: number; lng: number; state: MarkerType }[]) => {
			if (!map) return;

			clearMarkers();

			const newMarkers: kakao.maps.Marker[] = data.map(({ lat, lng, state }) => {
				const imageSrc = `/marker_${state}.svg`;
				const imageSize = new kakao.maps.Size(30, 32.44);
				const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
				const markerPosition = new kakao.maps.LatLng(lat, lng);

				return new kakao.maps.Marker({
					position: markerPosition,
					map,
					image: markerImage,
				});
			});

			setMarkers(newMarkers);
		},
		[map, markers]
	);

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation, setCirclePosition]);

	return { map, radius, setRadius, centerLocation, initMap, setMarkersFromData };
};

export default useKakaoMap;
