'use	client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';
import { Location, SetMarker } from '@/types/map';

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

	const clearMarkers = () => markerClusterRef.current && markerClusterRef.current.clear();

	const setMarker = useCallback(
		({ latitude, longitude, state, clickEvent }: SetMarker) => {
			if (!map || !markerClusterRef.current) return;

			const imageSrc = `/marker_${state}.svg`;
			const imageSize = new kakao.maps.Size(30, 32.44);
			const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
			const markerPosition = newLatLng({ latitude, longitude });

			const marker = new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage,
				clickable: true,
			});

			kakao.maps.event.addListener(marker, 'click', () => {
				clickEvent();
			});

			markerClusterRef.current.addMarker(marker);
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

	useEffect(() => {
		if (circle) {
			circle.setRadius(radius);
		}
	}, [radius]);

	return { map, initMap, clearMarkers, setMarker };
};

export default useKakaoMap;
