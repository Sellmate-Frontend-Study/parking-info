'use	client';

import { MarkerType } from '@/types/marker';
import { Location } from '@/types/location';
import { useCallback, useEffect, useRef, useState } from 'react';

const useKakaoMap = () => {
	const RADIUS = 250;
	const [centerLocation, setCenterLocation] = useState({ lat: 37.5665, lng: 126.978 });
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);

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

			const kakaoMap = new kakao.maps.Map(mapElement, options);
			setMap(kakaoMap);

			markerClusterRef.current = new kakao.maps.MarkerClusterer({
				map: kakaoMap,
				averageCenter: true,
				minLevel: 5,
			});

			const kakaoCircle = new kakao.maps.Circle({
				center,
				radius: RADIUS,
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
			const newCenter = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			circle.setPosition(newCenter);
		}
	}, [circle, centerLocation]);

	const setCenterPosition = useCallback(
		(lat: number, lng: number) => {
			if (!map) return;

			const newCenter = newLatLng({ latitude: lat, longitude: lng });
			map.setCenter(newCenter);
			setCenterLocation({ lat, lng });
		},
		[map]
	);

	const setMarkersFromData = useCallback(
		(data: { lat: number; lng: number; state: MarkerType }[]) => {
			if (!map || !markerClusterRef.current) return;

			markerClusterRef.current.clear();

			const newMarkers: kakao.maps.Marker[] = data.map(({ lat, lng, state }) => {
				const imageSrc = `/marker_${state}.svg`;
				const imageSize = new kakao.maps.Size(30, 32.44);
				const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
				const markerPosition = newLatLng({ latitude: lat, longitude: lng });

				return new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
				});
			});

			markerClusterRef.current.addMarkers(newMarkers);
		},
		[map]
	);

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation, setCirclePosition]);

	return { map, RADIUS, centerLocation, initMap, setMarkersFromData, setCenterPosition };
};

export default useKakaoMap;
