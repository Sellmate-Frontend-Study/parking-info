'use	client';

import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';
import { Location, SetMarker } from '@/types/map';

const useKakaoMap = () => {
	const [radius] = useAtom(radiusAtom);
	const [location, setLocation] = useAtom(locationAtom);
	const kakaoMap = useRef<kakao.maps.Map | null>(null);
	const mapCircle = useRef<kakao.maps.Circle | null>(null);
	const markerCluster = useRef<kakao.maps.MarkerClusterer | null>(null);
	const customOverlay = useRef<kakao.maps.CustomOverlay | null>(null);

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

			kakaoMap.current = new kakao.maps.Map(mapElement, options);

			markerCluster.current = new kakao.maps.MarkerClusterer({
				map: kakaoMap.current,
				averageCenter: true,
				minLevel: 5,
			});

			mapCircle.current = new kakao.maps.Circle({
				center,
				radius: radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			mapCircle.current.setMap(kakaoMap.current);

			kakao.maps.event.addListener(kakaoMap.current, 'dragend', () => {
				const newCenter = kakaoMap.current!.getCenter();
				setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
			});
		});
	};

	const clearMarkers = () => markerCluster.current && markerCluster.current.clear();

	const setMarker = useCallback(
		({ latitude, longitude, state, clickEvent }: SetMarker) => {
			if (!kakaoMap.current || !markerCluster.current) return;

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
				clickEvent(marker);
			});

			markerCluster.current.addMarker(marker);
		},
		[kakaoMap.current]
	);

	const showCustomOverlay = useCallback(
		(content: HTMLElement, marker: kakao.maps.Marker) => {
			hideCustomOverlay();

			customOverlay.current = new kakao.maps.CustomOverlay({
				clickable: true,
				map: kakaoMap.current!,
				content: content,
				position: marker.getPosition(),
				zIndex: 100,
			});

			kakaoMap.current?.setCenter(
				newLatLng({
					latitude: marker.getPosition().getLat() - 0.002,
					longitude: marker.getPosition().getLng(),
				})
			);
		},
		[kakaoMap.current]
	);

	const hideCustomOverlay = useCallback(() => {
		if (customOverlay.current) {
			customOverlay.current.setMap(null);
		}
	}, [kakaoMap.current]);

	useEffect(() => {
		if (kakaoMap.current && mapCircle.current) {
			const newCenter = newLatLng({
				latitude: location.latitude,
				longitude: location.longitude,
			});
			mapCircle.current.setPosition(newCenter);
			kakaoMap.current.setCenter(newCenter);
		}

		hideCustomOverlay();
	}, [location]);

	useEffect(() => {
		if (mapCircle.current) {
			mapCircle.current.setRadius(radius);
		}
	}, [radius]);

	return { kakaoMap, initMap, clearMarkers, setMarker, showCustomOverlay, hideCustomOverlay };
};

export default useKakaoMap;
