'use	client';

import { MarkerType } from '@/types/marker';
import { Location } from '@/types/location';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { centerLocationAtom, radiusAtom, mapAtom } from '@/store/mapAtoms';
import { createHTMLElementFromReactNode } from '@/utils/createHTMLElementFromReactNode';

interface SetMarkerOptionsInterface {
	key: string;
	lat: number;
	lng: number;
	state: MarkerType;
	markInfo: ReactNode;
}

const useKakaoMap = ({ onMarkerClick }: { onMarkerClick?: (key: string) => void }) => {
	const [RADIUS] = useAtom(radiusAtom);
	const setMapAtom = useSetAtom(mapAtom);
	const [centerLocation, setCenterLocation] = useAtom(centerLocationAtom);
	const [map, setMap] = useState<kakao.maps.Map | null>(null);
	const [circle, setCircle] = useState<kakao.maps.Circle | null>(null);
	const markerMapRef = useRef(new Map());
	const markerClusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);
	const infoWindowRef = useRef<kakao.maps.InfoWindow | null>(null);

	const newLatLng = ({ latitude, longitude }: Location) => {
		return new kakao.maps.LatLng(latitude, longitude);
	};

	const closeInfoWindow = () => {
		if (infoWindowRef.current) {
			infoWindowRef.current.close();
			infoWindowRef.current = null;
		}
	};

	const initMap = (mapElement: HTMLElement) => {
		kakao.maps.load(() => {
			const center = newLatLng({ latitude: centerLocation.lat, longitude: centerLocation.lng });
			const kakaoMap = new kakao.maps.Map(mapElement, {
				center,
				level: 3,
			});

			setMap(kakaoMap);
			setMapAtom(kakaoMap);

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
				closeInfoWindow();
				const newCenter = kakaoMap.getCenter();
				setCenterLocation({ lat: newCenter.getLat(), lng: newCenter.getLng() });
			});
			kakao.maps.event.addListener(kakaoMap, 'click', () => {
				closeInfoWindow();
			});
		});
	};

	const setCirclePosition = useCallback(() => {
		if (circle) {
			const newCenter = newLatLng({
				latitude: centerLocation.lat,
				longitude: centerLocation.lng,
			});
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
		[map, setCenterLocation]
	);

	const setMarker = useCallback(
		({ key, lat, lng, state, markInfo }: SetMarkerOptionsInterface) => {
			if (!map || !markerClusterRef.current) return;

			const markerImage = new kakao.maps.MarkerImage(
				`/marker_${state}.svg`,
				new kakao.maps.Size(30, 32.44),
				{ offset: new kakao.maps.Point(15, 32.44) }
			);

			const infoWindow = new kakao.maps.InfoWindow({
				content: createHTMLElementFromReactNode(markInfo),
				removable: true,
				zIndex: 999,
			});

			const marker = new kakao.maps.Marker({
				position: newLatLng({ latitude: lat, longitude: lng }),
				image: markerImage,
				clickable: true,
			});

			markerMapRef.current.set(key, { marker, infoWindow });
			kakao.maps.event.addListener(marker, 'click', () => {
				closeInfoWindow();
				infoWindow.open(map, marker);
				infoWindowRef.current = infoWindow;
				onMarkerClick?.(key);
			});

			markerClusterRef.current.addMarker(marker);
		},
		[map]
	);

	const openInfoWindow = useCallback(
		(key: string) => {
			const markerInfo = markerMapRef.current.get(key);
			if (!markerInfo || !map) return;

			closeInfoWindow();
			markerInfo.infoWindow.open(map, markerInfo.marker);
			infoWindowRef.current = markerInfo.infoWindow;
			onMarkerClick?.(key);
		},
		[map, onMarkerClick]
	);

	const resetMarkers = () => {
		markerClusterRef.current?.clear();
	};

	useEffect(() => {
		setCirclePosition();
	}, [centerLocation, setCirclePosition]);

	return {
		map,
		RADIUS,
		centerLocation,
		initMap,
		setMarker,
		resetMarkers,
		setCenterPosition,
		openInfoWindow,
	};
};

export default useKakaoMap;
