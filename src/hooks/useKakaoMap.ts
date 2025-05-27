'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAtom } from 'jotai';
import { radiusAtom } from '@/states/radiusAtom';
import { locationAtom } from '@/states/locationAtom';
import { Location, SetMarker } from '@/types/map';
import { kakaoMapAtom } from '@/states/kakaoMapAtom';
import { infoWindowAtom } from '@/states/infoWindowAtom';

const useKakaoMap = () => {
	const [radius] = useAtom(radiusAtom);
	const [location, setLocation] = useAtom(locationAtom);
	const [kakaoMap, setKakaoMap] = useAtom(kakaoMapAtom);
	const mapCircle = useRef<kakao.maps.Circle | null>(null);
	const markerCluster = useRef<kakao.maps.MarkerClusterer | null>(null);

	const [infoWindow, setInfoWindow] = useAtom(infoWindowAtom);

	const newLocation = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLocation({
				latitude: location.latitude,
				longitude: location.longitude,
			});
			const options = {
				center: center,
				level: 3,
			};

			const _kakaoMap = new kakao.maps.Map(mapElement, options);
			setKakaoMap(_kakaoMap);

			markerCluster.current = new kakao.maps.MarkerClusterer({
				map: _kakaoMap,
				averageCenter: true,
				minLevel: 5,
			});

			setInfoWindow(new kakao.maps.InfoWindow({ removable: true }));

			mapCircle.current = new kakao.maps.Circle({
				center,
				radius: radius,
				strokeColor: '#75B8FA',
				fillColor: '#CFE7FF',
				fillOpacity: 0.3,
			});
			mapCircle.current.setMap(_kakaoMap);

			kakao.maps.event.addListener(_kakaoMap, 'dragend', () => {
				const newCenter = _kakaoMap.getCenter();
				setLocation({ latitude: newCenter.getLat(), longitude: newCenter.getLng() });
			});
		});
	};

	const clearMarkers = () => markerCluster.current?.clear();

	const setMarker = useCallback(
		({ latitude, longitude, state, clickEvent }: SetMarker) => {
			if (!kakaoMap || !markerCluster.current) return;

			const imageSrc = `/marker_${state}.svg`;
			const imageSize = new kakao.maps.Size(30, 32.44);
			const imageOption = { offset: new kakao.maps.Point(15, 32.44) };
			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
			const markerPosition = newLocation({ latitude, longitude });

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
		[kakaoMap]
	);

	// const showCustomOverlay = useCallback(
	// 	(content: HTMLElement, location: Location) => {
	// 		if (kakaoMap) {
	// 			const iwContent = parkInfoDetail({
	// 				latitude,
	// 				longitude,
	// 			});
	// 			infoWindow!.setContent(iwContent);
	// 			infoWindow!.open(kakaoMap, marker);

	// 			hideCustomOverlay();

	// 			const _mapOverlay = new kakao.maps.CustomOverlay({
	// 				clickable: true,
	// 				map: kakaoMap,
	// 				content: content,
	// 				position: newLocation({
	// 					latitude: location.latitude,
	// 					longitude: location.longitude - 0.0025,
	// 				}),
	// 				zIndex: 100,
	// 			});

	// 			setMapOverlay(_mapOverlay);

	// 			kakaoMap.setCenter(
	// 				newLocation({
	// 					latitude: location.latitude - 0.002,
	// 					longitude: location.longitude,
	// 				})
	// 			);
	// 		}
	// 	},
	// 	[kakaoMap]
	// );

	const hideCustomOverlay = useCallback(() => {
		if (infoWindow) {
			infoWindow?.close();
		}
	}, [infoWindow]);

	useEffect(() => {
		if (kakaoMap && mapCircle.current) {
			const newCenter = newLocation({
				latitude: location.latitude,
				longitude: location.longitude,
			});
			mapCircle.current.setPosition(newCenter);
			kakaoMap.setCenter(newCenter);
		}

		// hideCustomOverlay();
	}, [location]);

	useEffect(() => {
		if (mapCircle.current) {
			mapCircle.current.setRadius(radius);
		}

		// hideCustomOverlay();
	}, [radius]);

	return {
		kakaoMap,
		initMap,
		clearMarkers,
		setMarker,
		hideCustomOverlay,
	};
};

export default useKakaoMap;
