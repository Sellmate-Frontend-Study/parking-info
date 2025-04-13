'use	client';

import { MarkerType } from '@/types/marker';
import { Location } from '@/types/location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';

const useKakaoMap = () => {
	const [radius] = useAtom(radiusAtom);
	const [location, setLocation] = useAtom(locationAtom);
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({
				latitude: location.latitude,
				longitude: location.longitude,
			});
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
				radius: radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			kakaoCircle.setMap(kakaoMap);
			setCircle(kakaoCircle);

			kakao.maps.event.addListener(kakaoMap, 'dragend', () => {
				const newCenter = kakaoMap.getCenter();
				setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
			});
		});
	};

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

				const marker = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage,
					clickable: true,
				});

				kakao.maps.event.addListener(marker, 'click', () => {
					console.log(marker);
				});

				return marker;
			});

			markerClusterRef.current.addMarkers(newMarkers);
		},
		[map]
	);

	useEffect(() => {
		if (map && circle) {
			const newCenter = newLatLng({
				latitude: location.latitude,
				longitude: location.longitude,
			});
			circle.setPosition(newCenter);
			map.setCenter(newCenter);
		}
	}, [location]);

	return { map, initMap, setMarkersFromData };
};

export default useKakaoMap;
